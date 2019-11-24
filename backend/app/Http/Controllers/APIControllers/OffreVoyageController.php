<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Categorie;
use App\models\Commercial;
use App\models\Groupe;
use App\models\OffreVoyage;
use App\models\Paiement;
use App\models\PGroupe;
use App\models\SGroupe;
use App\models\Traite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OffreVoyageController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(OffreVoyage::with('depenses')->findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findByIdByCommercialId($id, $idO)
    {
        try {
            return response()->json(Commercial::findOrFail($id)->offrevoyages()->findOrFail($idO));
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $result = OffreVoyage::whereHas('voyage', function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%');
        })->whereHas('voyage.categorie', function ($query) use ($request, $search) {
            $query->where('id', $request->categorie_id);
        })->whereHas('voyage.sousCategorie', function ($query) use ($request, $search) {
            if (isset($request->sous_categorie_id) && !empty($request->sous_categorie_id))
                $query->where('id', $request->sous_categorie_id);
        });;

        if (isset($request->statut) && !empty($request->statut)) {
            $result = $result->where('statut', $request->statut);
        }
        $result = (isset($request->dateDarrive) && !empty($request->dateDarrive)) ? $result->whereDate('dateDarrive', '<=', date('y-m-d', strtotime($request->dateDarrive))) : $result;
        $result = (isset($request->dateDepart) && !empty($request->dateDepart)) ? $result->whereDate('dateDepart', '>=', date('y-m-d', strtotime($request->dateDepart))) : $result;

        return response()->json($result->paginate($perPage));
    }

    public function findAllByCommercialId(Request $request, $id)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $result = Commercial::findOrFail($id)->offrevoyages()->whereHas('voyage', function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%');
        })->whereHas('voyage.categorie', function ($query) use ($request, $search) {
            $query->where('id', $request->categorie_id);
        })->whereHas('voyage.sousCategorie', function ($query) use ($request, $search) {
            if (isset($request->sous_categorie_id) && !empty($request->sous_categorie_id))
                $query->where('id', $request->sous_categorie_id);
        });
        if (isset($request->statut) && !empty($request->statut)) {
            $result = $result->where('statut', $request->statut);
        }
        $result = (isset($request->dateDarrive) && !empty($request->dateDarrive)) ? $result->whereDate('dateDarrive', '<=', date('y-m-d', strtotime($request->dateDarrive))) : $result;
        $result = (isset($request->dateDepart) && !empty($request->dateDepart)) ? $result->whereDate('dateDepart', '>=', date('y-m-d', strtotime($request->dateDepart))) : $result;
        return response()->json($result->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $OffreVoyage = OffreVoyage::findOrFail($input['id']);
            $OffreVoyage->dateDepart = date('y-m-d', strtotime($input['dateDepart']));
            $OffreVoyage->dateDarrive = date('y-m-d', strtotime($input['dateDarrive']));
            $OffreVoyage->statut = $input['statut'];
            $OffreVoyage->suffixe = $input['suffixe'];
            $OffreVoyage->num_autorisation = $input['num_autorisation'];
            $OffreVoyage->prixAdulte = $input['prixAdulte'];
            $OffreVoyage->prixEnfant = $input['prixEnfant'];
            $OffreVoyage->prixBebe = $input['prixBebe'];
            $OffreVoyage->num_dossier = $input['num_dossier'];
            $OffreVoyage->groupe = $input['groupe'];
            $OffreVoyage->agence_id = $input['agence_id'];
            $OffreVoyage->vehicule_id = $input['vehicule_id'];
            $OffreVoyage->chauffeur_id = $input['chauffeur_id'];
            $accompagnateur_ids = $input['accompagnateur_ids'];
            $depenses = $input['depenses'];

            DB::transaction(function () use ($depenses, $accompagnateur_ids, $OffreVoyage) {
                $depensesMap = [];
                foreach ($depenses as $value) {
                    $depensesMap[$value['id']] = ['prix' => $value['prix']];
                }
                $OffreVoyage->depenses()->sync($depensesMap);
                $OffreVoyage->accompagneurs()->sync($accompagnateur_ids);
                $OffreVoyage->saveOrFail();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($OffreVoyage);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $OffreVoyageAttributes = $attributes['offreVoyages'];
            DB::transaction(function () use ($OffreVoyageAttributes) {
                foreach ($OffreVoyageAttributes as $v) {
                    $v['dateDepart'] = date('y-m-d', strtotime($v['dateDepart']));
                    $v['dateDarrive'] = date('y-m-d', strtotime($v['dateDarrive']));
                    $offreVoyage = new OffreVoyage($v);
                    $offreVoyage->saveOrFail();
                    $accompagnateur_ids = $v['accompagnateur_ids'];
                    $offreVoyage->accompagneurs()->sync($accompagnateur_ids);
                }
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json(['message' => true]);
    }

    public function delete($id)
    {
        try {
            OffreVoyage::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
