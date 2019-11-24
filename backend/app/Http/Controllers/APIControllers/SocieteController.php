<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Societe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SocieteController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Societe::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Societe::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Societe = Societe::findOrFail($input['id']);
            $Societe->nom = $input['nom'];
            $Societe->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Societe);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $Societe = new Societe($attributes);
            $Societe->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($Societe);
    }

    public function delete($id)
    {
        try {
            Societe::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
