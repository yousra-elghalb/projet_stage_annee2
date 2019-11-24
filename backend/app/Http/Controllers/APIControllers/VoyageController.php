<?php

namespace App\Http\Controllers\APIControllers;

use App\models\OffreVoyage;
use App\models\Voyage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class VoyageController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Voyage::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $result = Voyage::where('nom', 'like', $search . '%');
        $result = (is_numeric($search)) ?
            $result
                ->orWhere('minPlace', $search)
                ->orWhere('prixAdulte', $search)
                ->orWhere('prixEnfant', $search)
                ->orWhere('prixBebe', $search)
                ->orWhere('maxPlace', $search) : $result;

        return response()->json($result->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Voyage = Voyage::findOrFail($input['id']);
            $Voyage->nom = $input['nom'];
            $Voyage->lien = $input['lien'];
            $Voyage->prixAdulte = $input['prixAdulte'];
            $Voyage->prixEnfant = $input['prixEnfant'];
            $Voyage->prixBebe = $input['prixBebe'];
            $Voyage->minPlace = $input['minPlace'];
            $Voyage->maxPlace = $input['maxPlace'];
            $Voyage->description = $input['description'];
            $Voyage->categorie_id = $input['categorie_id'];
            $Voyage->sous_categorie_id = $input['sous_categorie_id'];
            $Voyage->villeDeparts()->sync($request->villes);
            $Voyage->villesVisiter()->detach($request->villesVisiter);
            $Voyage->villesVisiter()->sync($request->villesVisiter);
            $Voyage->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Voyage);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $Voyage = new Voyage($attributes);
            DB::transaction(function () use ($request, $Voyage, $attributes) {
                $OffreVoyageAttributes = $attributes['offreVoyages'];
                $Voyage->saveOrFail();
                $Voyage->villeDeparts()->sync($request->villes);
                $Voyage->villesVisiter()->sync($request->villesVisiter);
                foreach ($OffreVoyageAttributes as $v) {
                    $v['dateDepart'] = date('y-m-d', strtotime($v['dateDepart']));
                    $v['dateDarrive'] = date('y-m-d', strtotime($v['dateDarrive']));
                    $accompagnateur_ids = $v['accompagnateur_ids'];
                    $v['prixAdulte'] = $Voyage->prixAdulte;
                    $v['prixEnfant'] = $Voyage->prixEnfant;
                    $v['prixBebe'] = $Voyage->prixBebe;
                    $v = $Voyage->offreVoyages()->create($v);
                    $v->accompagneurs()->sync($accompagnateur_ids);

                }
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
        return response()->json($Voyage);
    }

    public function delete($id)
    {
        try {
            Voyage::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
