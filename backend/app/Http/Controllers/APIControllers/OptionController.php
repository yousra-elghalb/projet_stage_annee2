<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OptionController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Option::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Option::where('nom', 'like', $Nom . '%')->get());
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();
            $Option = Option::findOrFail($input['id']);
            $Option->nom = $input['nom'];
            $Option->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => false], 500);
        }
        return response()->json($Option);
    }

    public function save(Request $request)
    {
        try {

            $attributes = $request->all();
            $Option = new Option($attributes);
            $Option->saveOrFail();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        } catch (\Throwable $e) {
        }
        return response()->json($Option);
    }

    public function delete($id)
    {
        try {
            Option::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
