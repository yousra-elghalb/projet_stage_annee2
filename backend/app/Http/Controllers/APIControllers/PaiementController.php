<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Paiement;
use App\models\Traite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class PaiementController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Paiement::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Nom = (isset($request->nom)) ? $request->nom : '';
        return response()->json(Paiement::where('nom', 'like', $Nom . '%')->paginate($perPage));
    }

    public function findAllTraites($id)
    {
        $Paiement = Paiement::findOrFail($id);
        return response()->json($Paiement->traites()->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Paiement = Paiement::findOrFail($input['id']);
            $Paiement->nom = $input['voyage_id'];
            if (isset($request->voyageur_id))
                $Paiement->voyageur_id = $input['voyageur_id'];
            if (isset($request->groupe_id))
                $Paiement->groupe_id = $input['groupe_id'];
            $Paiement->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $Traite = new Traite((array)$request->traite);
            $Paiement = new Paiement($attributes);
            DB::transaction(function () use ($Traite, $Paiement) {
                $Traite->saveOrFail();
                $Paiement->saveOrFail();
                $Traite->paiement()->associate($Paiement);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true, true, 'data' => $Paiement]);
    }

    public function delete($id)
    {
        try {
            Paiement::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
