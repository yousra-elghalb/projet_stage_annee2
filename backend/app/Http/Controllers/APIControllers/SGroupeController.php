<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Groupe;
use App\models\OffreVoyage;
use App\models\Paiement;
use App\models\PGroupe;
use App\models\SGroupe;
use App\models\Traite;
use App\models\Voyageur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SGroupeController extends Controller
{

    public function findById($id)
    {
        try {
            return response()->json(SGroupe::with('commercial', 'paiement.traites', 'options')->findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findGroupeByOffreVoyageId(Request $request, $id)
    {
        $OffreVoyage = OffreVoyage::findOrFail($id);
        $result = $OffreVoyage->sGroupes()->with('commercial', 'paiement.traites', 'options')->get()->first();
        return response()->json($result);
    }

    public function save(Request $request)
    {

        $attributes = $request->all();
        $Voyageurs = $attributes['voyageurs'];
        $Traites = $attributes['traites'];
        $options = $attributes['options'];
        $SGroupe = new SGroupe();
        $SGroupe->etat = $attributes['etat'];
        $SGroupe->groupe_convention_id = $attributes['groupe_convention_id'];
        $SGroupe->reduction = $attributes['reduction'];
        $SGroupe->offre_voyage_id = $attributes['offre_voyage_id'];
        $SGroupe->commercial_id = Auth::user()->commercial()->first()->id;
        $Paiement = new Paiement();
        $Paiement->reste = $request->reste;
        $Paiement->totale = $request->totale;
        DB::transaction(function () use ($request, $options, $Voyageurs, $SGroupe, $Traites) {
            $SGroupe->save();
            $optionsMap = [];
            $VoyageursMap = [];
            foreach ($options as $value) {
                $optionsMap[$value['id']] = ['prix' => $value['prix']];
            }
            $SGroupe->options()->sync($optionsMap);
            foreach ($Voyageurs as $v) {
                if (isset($v['id']) && !empty($v['id'])) {
//                    $SGroupe->voyageurs()->attach($v['id']);
                    $VoyageursMap[$v['id']] = ['ville_depart' => $v['ville_depart']];
                } else {
                    $v['dateExpiration'] = date('y-m-d', strtotime($v['dateExpiration']));
                    $voyageur = new Voyageur($v);
                    $voyageur->saveOrFail();
                    $VoyageursMap[$voyageur->id] = ['ville_depart' => $v['ville_depart']];
//                    $SGroupe->voyageurs()->create($v);
                }
            }
            $SGroupe->voyageurs()->sync($VoyageursMap);
            if ($SGroupe->etat == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage += 1;
                    $Voyageur->saveOrFail();
                }
            }
//            $Paiement = new Paiement();
            $Paiement = $SGroupe->paiement()->create(['reste' => $request->reste, 'totale' => $request->totale]);
            foreach ($Traites as $v) {
                if (isset($v['pieceJointe']) && !empty($v['pieceJointe'])) {
                    @list($type, $file_data) = explode(';', $v['pieceJointe']);
                    @list(, $type) = explode('/', $type);
                    @list(, $file_data) = explode(',', $file_data);
                    $data = base64_decode($file_data);
                    $name = 'PieceJoinPaiments-' . auth()->id() . '-' . time() . '.' . $type;
                    Storage::disk('pieceJoinPaiments')->put($name, $data);
                    $v['pieceJointe'] = $name;
//                    $v['pieceJointe'] = asset('storage/' . $name);
                }
                $v['date'] = date('y-m-d', strtotime($v['date']));
                $Paiement->traites()->create($v);
            }
        });
        return response()->json(['message' => true]);
    }

    public function update(Request $request)
    {

        $attributes = $request->all();
        $SGroupe = SGroupe::findOrFail($attributes['id']);
        $Voyageurs = $attributes['voyageurs'];
        $Traites = $attributes['traites'];
        $options = $attributes['options'];
        $SGroupe->groupe_convention_id = $attributes['groupe_convention_id'];
        $SGroupe->reduction = $attributes['reduction'];
//        $SGroupe->offre_voyage_id = $attributes['offre_voyage_id'];
//        $SGroupe->commercial_id = Auth::user()->commercial()->first()->id;
        $Paiement = Paiement::findOrFail($attributes['paiement_id']);
        $Paiement->reste = $request->reste;
        $Paiement->totale = $request->totale;
        DB::transaction(function () use ($attributes, $Paiement, $request, $options, $Voyageurs, $SGroupe, $Traites) {
            $optionsMap = [];
            $VoyageursMap = [];

            foreach ($options as $value) {
                $optionsMap[$value['id']] = ['prix' => $value['prix']];
            }
            $SGroupe->options()->sync($optionsMap);
            foreach ($Voyageurs as $v) {
                if (isset($v['id']) && !empty($v['id'])) {
//                    $SGroupe->voyageurs()->attach($v['id']);
                    $VoyageursMap[$v['id']] = ['ville_depart' => $v['ville_depart']];
                } else {
                    $v['dateExpiration'] = date('y-m-d', strtotime($v['dateExpiration']));
                    $voyageur = new Voyageur($v);
                    $voyageur->saveOrFail();
                    $VoyageursMap[$voyageur->id] = ['ville_depart' => $v['ville_depart']];
//                    $SGroupe->voyageurs()->create($v);
                }
            }
            if ($SGroupe->etat == "validé" && $attributes['etat'] == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    if (!$SGroupe->voyageurs()->get()->contains($id)) {
                        $Voyageur = Voyageur::findOrFail($id);
                        $Voyageur->nb_voyage += 1;
                        $Voyageur->saveOrFail();
                    }
                }
            }
            $SGroupe->voyageurs()->sync($VoyageursMap);
            if ($SGroupe->etat != "validé" && $attributes['etat'] == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage += 1;
                    $Voyageur->saveOrFail();
                }
            }
            if ($SGroupe->etat == "validé" && $attributes['etat'] != "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage -= 1;
                    $Voyageur->saveOrFail();
                }
            }
            $SGroupe->etat = $attributes['etat'];
            $SGroupe->save();
//            $Paiement = new Paiement();
            $Paiement->save();
            foreach ($request->deleted_traites_ids as $id) {
                $Traite = Traite::findOrFail($id);
                $Traite->delete();
            }
            foreach ($Traites as $v) {
                if (isset($v['id']) && !empty($v['id'])) {
                    $Traite = Traite::findOrFail($v['id']);
                    $Traite->montant = $v['montant'];
                    $Traite->save();
                } else {
                    $v['date'] = date('y-m-d', strtotime($v['date']));
                    $Paiement->traites()->create($v);
                }
            }
        });
        return $this->findById($attributes['id']);
    }

    public function delete($id)
    {
        try {
            SGroupe::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
