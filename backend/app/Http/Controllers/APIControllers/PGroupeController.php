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

class PGroupeController extends Controller
{

    public function findById($id)
    {
        try {
            return response()->json(PGroupe::with('commercial', 'paiement.traites', 'options')->findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAllByOffreVoyageId(Request $request, $id)
    {
        $OffreVoyage = OffreVoyage::findOrFail($id);
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';

        $result = $OffreVoyage->pGroupes()
            ->whereHas('voyageurs', function ($query) use ($search) {
                $query->where('nom', 'like', $search . '%')
                    ->orWhere('prenom', 'like', $search . '%')
                    ->orWhere('cin', 'like', $search . '%')
                    ->orWhere('tel', 'like', $search . '%');
            });
        if (is_numeric($search)) {
            $result = $result->orWhereHas('paiement', function ($query) use ($search) {
                $query->where('reste', $search)
                    ->orWhere('totale', $search);
            });
            $result = $result->orWhereHas('paiement.traites', function ($query) use ($search) {

                $query->where('montant', $search);
            });
            $result = $result->orWhere('reduction', $search);
        } else {
            if ((isset($request->etat) && !empty($request->etat)))
                $result = $result->where('etat', $request->etat);
            if ((isset($request->type) && !empty($request->type)))
                $result = $result->where('type', $request->type);
            if ((isset($request->ville) && !empty($request->ville)))
                $result = $result->whereHas('ville', function ($query) use ($request) {
                    $query->where('id', $request->ville);
                });
        }
        $user = Auth::user();
        $Commercial = $user->commercial()->get()->first();
        if ($Commercial->limitedAccess) {
            $result = $result->where('commercial_id', $Commercial->id);
        }
        if (isset($request->modalites) && !empty($request->modalites)) {
            $tab = explode(",", $request->modalites);
            $result = $result->whereHas('paiement.traites', function ($query) use ($tab) {
                $query->whereIn('modaliteDePaiement_id', $tab);
            });
        }
        $result = $result->with('commercial', 'paiement.traites')->paginate($perPage);
        return response()->json($result);
    }

    public function save(Request $request)
    {

        $attributes = $request->all();
        $Voyageurs = $attributes['voyageurs'];
        $Traites = $attributes['traites'];
        $options = $attributes['options'];
        $PGroupe = new PGroupe();
        $PGroupe->etat = $attributes['etat'];
        $PGroupe->type = $attributes['type'];
        $PGroupe->ville_id = $attributes['ville_id'];
        $PGroupe->reduction = $attributes['reduction'];
        $PGroupe->offre_voyage_id = $attributes['offre_voyage_id'];
        $PGroupe->commercial_id = Auth::user()->commercial()->first()->id;
        $Paiement = new Paiement();
        $Paiement->reste = $request->reste;
        $Paiement->totale = $request->totale;
        DB::transaction(function () use ($request, $options, $Voyageurs, $PGroupe, $Traites) {
            $PGroupe->save();
            $optionsMap = [];
            $VoyageursMap = [];
            foreach ($options as $value) {
                $optionsMap[$value['id']] = ['prix' => $value['prix']];
            }
            $PGroupe->options()->sync($optionsMap);
            foreach ($Voyageurs as $v) {
                if (isset($v['id']) && !empty($v['id'])) {
                    $VoyageursMap[$v['id']] = [];
//                    $PGroupe->voyageurs()->attach($v['id']);
                } else {
                    $v['dateExpiration'] = date('y-m-d', strtotime($v['dateExpiration']));
                    $voyageur = new Voyageur($v);
                    $voyageur->saveOrFail();
                    $VoyageursMap[$voyageur->id] = [];
//                    $PGroupe->voyageurs()->create($v);
                }
            }
            $PGroupe->voyageurs()->sync($VoyageursMap);
            if ($PGroupe->etat == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage += 1;
                    $Voyageur->saveOrFail();
                }
            }
//            $Paiement = new Paiement();
            $Paiement = $PGroupe->paiement()->create(['reste' => $request->reste, 'totale' => $request->totale]);
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
        return $this->findById($PGroupe->id);
    }


    public function update(Request $request)
    {

        $attributes = $request->all();
        $PGroupe = PGroupe::findOrFail($attributes['id']);
        $Voyageurs = $attributes['voyageurs'];
        $Traites = $attributes['traites'];
        $options = $attributes['options'];
        $PGroupe->type = $attributes['type'];
        $PGroupe->ville_id = $attributes['ville_id'];
        $PGroupe->reduction = $attributes['reduction'];
        $Paiement = Paiement::findOrFail($attributes['paiement_id']);
        $Paiement->reste = $request->reste;
        $Paiement->totale = $request->totale;
        DB::transaction(function () use ($attributes, $Paiement, $request, $options, $Voyageurs, $PGroupe, $Traites) {
            $optionsMap = [];
            $VoyageursMap = [];
            foreach ($options as $value) {
                $optionsMap[$value['id']] = ['prix' => $value['prix']];
            }
            $PGroupe->options()->sync($optionsMap);
            foreach ($Voyageurs as $v) {
                if (isset($v['id']) && !empty($v['id'])) {
//                    $PGroupe->voyageurs()->attach($v['id']);
                    $VoyageursMap[$v['id']] = [];
                } else {
                    $v['dateExpiration'] = date('y-m-d', strtotime($v['dateExpiration']));
                    $voyageur = new Voyageur($v);
                    $voyageur->saveOrFail();
                    $VoyageursMap[$voyageur->id] = [];
                }
            }
            if ($PGroupe->etat == "validé" && $attributes['etat'] == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    if (!$PGroupe->voyageurs()->get()->contains($id)) {
                        $Voyageur = Voyageur::findOrFail($id);
                        $Voyageur->nb_voyage += 1;
                        $Voyageur->saveOrFail();
                    }
                }
            }
            $PGroupe->voyageurs()->sync($VoyageursMap);

            if ($PGroupe->etat != "validé" && $attributes['etat'] == "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage += 1;
                    $Voyageur->saveOrFail();
                }
            }
            if ($PGroupe->etat == "validé" && $attributes['etat'] != "validé") {
                $VoyageursIds = array_keys($VoyageursMap);
                foreach ($VoyageursIds as $id) {
                    $Voyageur = Voyageur::findOrFail($id);
                    $Voyageur->nb_voyage -= 1;
                    $Voyageur->saveOrFail();
                }
            }
            $PGroupe->etat = $attributes['etat'];
            $PGroupe->save();

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
                    if ($v['pieceJointeChanged']) {
                        @list($type, $file_data) = explode(';', $v['pieceJointe']);
                        @list(, $type) = explode('/', $type);
                        @list(, $file_data) = explode(',', $file_data);
                        $data = base64_decode($file_data);
                        $name = 'PieceJoinPaiments-' . auth()->id() . '-' . time() . '.' . $type;
                        Storage::disk('pieceJoinPaiments')->put($name, $data);
                        $nameToDelete = explode('/', $Traite->pieceJointe);
                        $nameToDelete = end($nameToDelete);
                        Storage::disk('pieceJoinPaiments')->delete($nameToDelete);
                        $Traite->pieceJointe = $name;
                    }
                    $Traite->save();
                } else {
                    $v['date'] = date('y-m-d', strtotime($v['date']));

                    if (isset($v['pieceJointe']) && !empty($v['pieceJointe'])) {
                        @list($type, $file_data) = explode(';', $v['pieceJointe']);
                        @list(, $type) = explode('/', $type);
                        @list(, $file_data) = explode(',', $file_data);
                        $data = base64_decode($file_data);
                        $name = 'PieceJoinPaiments-' . auth()->id() . '-' . time() . '.' . $type;
                        Storage::disk('pieceJoinPaiments')->put($name, $data);
                        $v['pieceJointe'] = $name;
                    }

                    $Paiement->traites()->create($v);
                }
            }
        });
        return $this->findById($PGroupe->id);
    }


    public function delete($id)
    {
        try {
            PGroupe::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
