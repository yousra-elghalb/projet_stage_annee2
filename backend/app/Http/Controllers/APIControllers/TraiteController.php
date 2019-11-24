<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Traite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class TraiteController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Traite::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Nom = (isset($request->nom)) ? $request->nom : '';
        return response()->json(Traite::where('nom', 'like', $Nom . '%')->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Traite = Traite::findOrFail($input['id']);
            $Traite->montant = $input['montant'];
            $Traite->date = $input['date'];
//            $Traite->pieceJointe = $input['pieceJointe'];

            Storage::delete($Traite->pieceJointe);
            $path = Storage::putFile('photosPieceJointeTraites', $input['pieceJointe']);
            $Traite->pieceJointe = $path;

            $Traite->paiement_id = $input['paiement_id'];
            $Traite->modaliteDePaiement_id = $input['modaliteDePaiement_id'];
            $Traite->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
            $attributes['date'] = Date::now();
            $path = Storage::putFile('photosPieceJointeTraites', $request->pieceJointe);
            $attributes['pieceJointe'] = $path;
            $Traite = new Traite($attributes);
            $Traite->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true, true, 'data' => $Traite]);
    }

    public function delete($id)
    {
        try {
            Traite::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
