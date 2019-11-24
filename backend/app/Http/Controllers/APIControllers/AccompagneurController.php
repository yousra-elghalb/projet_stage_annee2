<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Accompagneur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AccompagneurController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Accompagneur::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(Accompagneur::where('nom', 'like', $search . '%')
            ->orWhere('prenom', 'like', $search . '%')
            ->orWhere('tel', 'like', $search . '%')
            ->orWhere('email', 'like', $search . '%')
            ->orWhere('cin', 'like', $search . '%')->get());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Accompagneur = Accompagneur::findOrFail($input['id']);
        $Accompagneur->nom = $input['nom'];
        $Accompagneur->prenom = $input['prenom'];
        $Accompagneur->tel = $input['tel'];
        $Accompagneur->email = $input['email'];
        $Accompagneur->cin = $input['cin'];
        $Accompagneur->saveOrFail();

        return response()->json($Accompagneur);
    }

    public function save(Request $request)
    {
        $attributes = $request->all();
        $Accompagneur = new Accompagneur($attributes);
        $Accompagneur->saveOrFail();
        return response()->json($Accompagneur);
    }

    public function delete($id)
    {
        try {
            Accompagneur::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
