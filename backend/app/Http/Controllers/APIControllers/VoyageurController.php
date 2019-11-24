<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Voyageur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class VoyageurController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Voyageur::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findByCin($cin)
    {
        $Voyageur = Voyageur::where(['cin' => $cin])->get()->first();
        if ($Voyageur != null)
            return response()->json($Voyageur);
        else
            return response()->json($Voyageur, 500);

    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $result = Voyageur::where(function ($query) use ($search) {
            $query->where('nom', 'like', $search . '%')
                ->orWhere('prenom', 'like', $search . '%')
                ->orWhere('tel', 'like', $search . '%')
                ->orWhere('email', 'like', $search . '%')
                ->orWhere('cin', 'like', $search . '%')
                ->orWhere('sexe', 'like', $search . '%')
                ->orWhere('stadeVie', 'like', $search . '%')
                ->orWhere('numPasseport', 'like', $search . '%');
        });

        if (isset($request->fidele) && $request->fidele == 1)
            $result = $result->where('nb_voyage', '>=', 5);
        else
            $result = $result->where('nb_voyage', '<', 5);

        if (isset($request->black))
            $result = $result->where('black', $request->black);

        return response()->json($result->paginate($perPage));
    }


    public function findAllVoyages(Request $request, $id)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $Voyageur = Voyageur::findOrFail($id);
        $result = $Voyageur->voyages()->whereHas('nomVoyage', function ($query) use ($search) {
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
            $Voyageur = Voyageur::findOrFail($input['id']);
            $Voyageur->nom = $input['nom'];
            $Voyageur->prenom = $input['prenom'];
            $Voyageur->tel = $input['tel'];
            $Voyageur->sexe = $input['sexe'];
            $Voyageur->stadeVie = $input['stadeVie'];
            $Voyageur->email = $input['email'];
            $Voyageur->cin = $input['cin'];
            $Voyageur->black = $input['black'];
            $Voyageur->dateExpiration = date('y-m-d', strtotime($input['dateExpiration']));
            $Voyageur->numPasseport = $input['numPasseport'];
            $Voyageur->groupe_convention_id = $input['groupe_convention_id'];
//            $Voyageur->srcVisa = $input['srcVisa'];
//            Storage::delete($Voyageur->srcVisa);
//            $path = Storage::putFile('photosVisa', $input['srcVisa']);
//            $Voyageur->srcVisa = $path;

            $Voyageur->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Voyageur);
    }

    public function save(Request $request)
    {
        try {
            $attributes = $request->all();
//            $path = Storage::putFile('photosVisa', $request->srcVisa);
//            $attributes['srcVisa'] = $path;
            $Voyageur = new Voyageur($attributes);
            $Voyageur->dateExpiration = date('y-m-d', strtotime($attributes['dateExpiration']));
            $Voyageur->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($Voyageur);
    }

    public function delete($id)
    {
        try {
            Voyageur::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
