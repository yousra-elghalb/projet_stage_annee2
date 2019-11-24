<?php

namespace App\Http\Controllers\APIControllers;

use App\models\ModaliteDePaiement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class ModaliteDePaiementController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(ModaliteDePaiement::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(ModaliteDePaiement::where('nom', 'like', $Nom . '%')->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $ModaliteDePaiement = ModaliteDePaiement::findOrFail($input['id']);
            $ModaliteDePaiement->nom = $input['nom'];
            $ModaliteDePaiement->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json($ModaliteDePaiement);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $ModaliteDePaiement = new ModaliteDePaiement($attributes);
            $ModaliteDePaiement->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        } catch (\Throwable $e) {
        }
        return response()->json($ModaliteDePaiement);
    }

    public function delete($id)
    {
        try {
            ModaliteDePaiement::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
