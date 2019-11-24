<?php

namespace App\Http\Controllers\APIControllers;

use App\models\GroupeConvention;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class GroupeConventionController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(GroupeConvention::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $result = GroupeConvention::where(function ($query) use ($search) {
            $query->where('nom', 'like', '%' . $search . '%')
                ->orWhere('tel', 'like', $search . '%')
                ->orWhere('raisonSociale', 'like', '%' . $search . '%')
                ->orWhere('ice', 'like', $search . '%')
                ->orWhere('responsable', 'like', $search . '%')
                ->orWhere('adresse', 'like', $search . '%');
            if (is_numeric($search)) {
                $query->orWhere('reduction', $search)->orWhere('taille', $search);
            }
        });
        if (isset($request->type) && !empty($request->type))
            $result = $result->where('type', $request->type);
        return response()->json($result->paginate($perPage));

    }

    public function update(Request $request)
    {
        $input = $request->all();
        $GroupeConvention = GroupeConvention::findOrFail($input['id']);
        $GroupeConvention->nom = $input['nom'];
        $GroupeConvention->type = $input['type'];
        $GroupeConvention->tel = $input['tel'];
        $GroupeConvention->raisonSociale = $input['raisonSociale'];
        $GroupeConvention->ice = $input['ice'];
        $GroupeConvention->responsable = $input['responsable'];
        $GroupeConvention->adresse = $input['adresse'];
        $GroupeConvention->taille = $input['taille'];
        $GroupeConvention->reduction = $input['reduction'];
        $GroupeConvention->saveOrFail();

        return response()->json($GroupeConvention);
    }

    public function save(Request $request)
    {
        $attributes = $request->all();
        $GroupeConvention = new GroupeConvention($attributes);
        $GroupeConvention->saveOrFail();
        return response()->json($GroupeConvention);
    }

    public function delete($id)
    {
        try {
            GroupeConvention::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
