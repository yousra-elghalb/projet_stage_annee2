<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Chauffeur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ChauffeurController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Chauffeur::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(Chauffeur::where('nom', 'like', $search . '%')
            ->orWhere('prenom', 'like', $search . '%')
            ->orWhere('tel', 'like', $search . '%')
            ->orWhere('email', 'like', $search . '%')
            ->orWhere('cin', 'like', $search . '%')->get());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Chauffeur = Chauffeur::findOrFail($input['id']);
        $Chauffeur->nom = $input['nom'];
        $Chauffeur->prenom = $input['prenom'];
        $Chauffeur->tel = $input['tel'];
        $Chauffeur->email = $input['email'];
        $Chauffeur->cin = $input['cin'];
        $Chauffeur->saveOrFail();

        return response()->json($Chauffeur);
    }

    public function save(Request $request)
    {
        $attributes = $request->all();
        $Chauffeur = new Chauffeur($attributes);
        $Chauffeur->saveOrFail();
        return response()->json($Chauffeur);
    }

    public function delete($id)
    {
        try {
            Chauffeur::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
