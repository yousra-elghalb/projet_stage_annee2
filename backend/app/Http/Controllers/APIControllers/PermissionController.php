<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Permission;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Permission::findOrFail($id));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAll(Request $request)
    {
        $Nom = (isset($request->search)) ? $request->search : '';
        return response()->json(Permission::where('nomModule', 'like', $Nom . '%')->get());
    }

}
