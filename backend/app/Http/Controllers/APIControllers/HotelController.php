<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Hotel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HotelController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Hotel::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(Hotel::where('nom', 'like', $search . '%')
            ->orWhere('rib', 'like', $search . '%')
            ->orWhere('responsable', 'like', $search . '%')->get());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Hotel = Hotel::findOrFail($input['id']);
        $Hotel->nom = $input['nom'];
        $Hotel->cat = $input['cat'];
        $Hotel->formule = $input['formule'];
        $Hotel->rib = $input['rib'];
        $Hotel->reponsable = $input['responsable'];
        $Hotel->saveOrFail();

        return response()->json($Hotel);
    }

    public function save(Request $request)
    {
        $attributes = $request->all();
        $Hotel = new Hotel($attributes);
        $Hotel->saveOrFail();
        return response()->json($Hotel);
    }

    public function delete($id)
    {
        try {
            Hotel::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
