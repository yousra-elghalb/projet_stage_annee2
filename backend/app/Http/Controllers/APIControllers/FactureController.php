<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Facture;
use App\models\PGroupe;
use App\models\SGroupe;
use App\models\Traite;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FactureController extends Controller
{


    public function save(Request $request)
    {
        try {

            $G = Traite::findOrFail($request->traite_id);

            if ($G->facture()->exists()) {
                $input = $request->all();
                $Facture = Facture::findOrFail($input['id']);
                if (isset($input['nom_voyageur']))
                    $Facture->nom_voyageur = $input['nom_voyageur'];
                if (isset($input['ice']))
                    $Facture->ice = $input['ice'];
                if (isset($input['cin']))
                    $Facture->cin = $input['cin'];
                $Facture->num = $input['num'];
                if (isset($input['nom_groupe']))
                    $Facture->nom_groupe = $input['nom_groupe'];
                $Facture->ref = $input['ref'];
                $Facture->desi = $input['desi'];
                if (isset($input['ttc']))
                    $Facture->ttc = $input['ttc'];
                $Facture->saveOrFail();
            } else {
                $input = $request->all();
                $Facture = new Facture($input);
                DB::transaction(function () use ($Facture, $request) {
                    $Facture->saveOrFail();
                });
            }


        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($Facture->traite()->get()->first()->paiement()->with('traites')->get()->first());
    }

}
