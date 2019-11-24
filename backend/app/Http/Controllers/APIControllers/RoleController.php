<?php

namespace App\Http\Controllers\APIControllers;

use App\models\Permission;
use App\models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function findById($id)
    {
        try {
            return response()->json(Role::findOrFail($id));
        } catch (\Exception $e) {
            return response()->json(["mes" => $e->getMessage()], 500);
        }
    }

    public function findAll(Request $request)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $Search = (isset($request->search)) ? $request->search : '';
        return response()->json(Role::where('nom', 'like', $Search . '%')->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $permissionMap = [];
            foreach ($request->permissions as $value) {
//                $permissionMap[$value['id']] = $value['pivot'];
                $permissionMap[$value['id']] = $value['pivot'];
            }
            $input = $request->all();
            $Role = Role::findOrFail($input['id']);
            DB::transaction(function () use ($permissionMap, $input, $Role, $request) {
                $Role->nom = $input['nom'];
                $Role->permissions()->syncWithoutDetaching($permissionMap);
                $Role->saveOrFail();
            });
        } catch (\Exception $e) {
            response()->json("", 500);
        }
        return response()->json($Role);
    }

    public function save(Request $request)
    {
//        error_log($request->permissions[0]);
        $permissionMap = [];
        foreach ($request->permissions as $value) {
            $permissionMap[$value['id']] = $value['pivot'];
        }
        $attributes = $request->all();
        $Role = new Role($attributes);

        DB::transaction(function () use ($permissionMap, $Role, $request) {
            $Role->saveOrFail();
//            $Role->permissions()->sync([1 => ["edit" => true]]);
//            Permission::get('id');
            $Role->permissions()->syncWithoutDetaching($permissionMap);
//            $Role->permissions()->sync(Permission::get('id'));
        });
//        return response()->json($permissionMap);
        return response()->json($Role);
    }

    public function delete($id)
    {
        try {
            Role::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
