<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Categorie;
use App\models\Voyage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CategorieController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Categorie::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Categorie::where('nom', 'like', $Nom . '%')->get());
    }

    public function findAllVoyages(Request $request, $id)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $Categorie = Categorie::findOrFail($id);
        $result = $Categorie->voyages()->whereHas('nomVoyage', function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%');
        })->orWhereHas('agence', function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%');
        });;
        $result = (is_numeric($search)) ?
            $result
                ->orWhere('prix', $search)
                ->orWhere('minPlace', $search)
                ->orWhere('paxPlace', $search) : $result;

        $result = (isset($request->typeVoyage)) ? $result->where('typeVoyage', $request->typeVoyage) : $result;
        $result = (isset($request->statut)) ? $result->where('statut', $request->statut) : $result;
        return response()->json($result->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Categorie = Categorie::findOrFail($input['id']);
            $Categorie->nom = $input['nom'];
            DB::transaction(function () use ($request, $Categorie) {
                $Categorie->saveOrFail();
                $Categorie->sousCategories()->sync($request->sousCategories);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($Categorie);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $Categorie = new Categorie($attributes);
            DB::transaction(function () use ($request, $Categorie) {
                $Categorie->saveOrFail();
                $Categorie->sousCategories()->sync($request->sousCategories);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($Categorie);
    }

    public function delete($id)
    {
        try {
            Categorie::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
