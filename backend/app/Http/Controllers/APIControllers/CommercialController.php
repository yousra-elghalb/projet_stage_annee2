<?php

namespace App\Http\Controllers\APIControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterAuthRequest;
use App\models\Commercial;
use App\models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CommercialController extends Controller
{
    public function findById($id)
    {
        try {
//            return response()->json(Commercial::with('roles')->findOrFail($id));
            return response()->json(Commercial::with('user.roles')->findOrFail($id));
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function findAll(Request $request)
    {
        $search = (isset($request->search)) ? $request->search : '';
        return response()->json(Commercial::with(['user.roles', 'agence'])->where('nom', 'like', $search . '%')
            ->orWhere('prenom', 'like', $search . '%')
            ->orWhere('tel', 'like', $search . '%')
            ->orWhere('email', 'like', $search . '%')
            ->get());
    }

    public function findAllCommerciauxExterne(Request $request)
    {
        return response()->json(Commercial::where('limitedAccess', true)
            ->get());
    }

    public function findAllVoyageur(Request $request, $id)
    {
        $perPage = (isset($request->perPage)) ? $request->perPage : 15;
        $search = (isset($request->search)) ? $request->search : '';
        $Commercial = Commercial::findOrFail($id);

        $result = $Commercial->voyageurs()
            ->where('nom', 'like', $search . '%')
            ->orWhere('prenom', 'like', $search . '%')
            ->orWhere('tel', 'like', $search . '%')
            ->orWhere('email', 'like', $search . '%')
            ->orWhere('cin', 'like', $search . '%')
            ->orWhere('sexe', 'like', $search . '%')
            ->orWhere('etat', 'like', $search . '%')
            ->orWhere('numPasseport', 'like', $search . '%');
        $result = (isset($request->etat)) ? $result->where('etat', $request->etat) : $result;
        return response()->json($result->paginate($perPage));
    }

    public function update(Request $request)
    {
        try {
            $input = $request->all();

            $Commercial = Commercial::findOrFail($input['id']);
            $Commercial->nom = $input['nom'];
            $Commercial->prenom = $input['prenom'];
            $Commercial->tel = $input['tel'];
            $Commercial->cin = $input['cin'];
            $Commercial->email = $input['email'];
            $Commercial->agence_id = $input['agence_id'];
            $Commercial->limitedAccess = $input['limitedAccess'];

            if ($Commercial->srcImg != $input['srcImg']) {
                $base64_image = $request->srcImg;
                @list($type, $file_data) = explode(';', $base64_image);
                @list(, $type) = explode('/', $type);
                @list(, $file_data) = explode(',', $file_data);
                $data = base64_decode($file_data);
                $name = 'PI-' . auth()->id() . '-' . time() . '.' . $type;
                Storage::disk('profileImgs')->put($name, $data);
                $nameToDelete = explode('/', $Commercial->srcImg);
                $nameToDelete = end($nameToDelete);
                Storage::disk('profileImgs')->delete($nameToDelete);
                $Commercial->srcImg = $name;
            }
            DB::transaction(function () use ($Commercial, $request) {

                $Commercial->user()->first()->roles()->sync($request->roles);
                $Commercial->saveOrFail();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json(Commercial::with('agence')->findOrFail($Commercial->id));
    }

    public function updateProfile(Request $request)
    {
        try {
            $input = $request->all();

            $Commercial = Commercial::findOrFail($input['id']);
            $Commercial->nom = $input['nom'];
            $Commercial->prenom = $input['prenom'];
            $Commercial->tel = $input['tel'];
            $Commercial->cin = $input['cin'];
            $Commercial->email = $input['email'];

            if ($Commercial->srcImg != $input['srcImg']) {
                $base64_image = $request->srcImg;
                @list($type, $file_data) = explode(';', $base64_image);
                @list(, $type) = explode('/', $type);
                @list(, $file_data) = explode(',', $file_data);
                $data = base64_decode($file_data);
                $name = 'PI-' . auth()->id() . '-' . time() . '.' . $type;
                Storage::disk('profileImgs')->put($name, $data);
                $nameToDelete = explode('/', $Commercial->srcImg);
                $nameToDelete = end($nameToDelete);
                Storage::disk('profileImgs')->delete($nameToDelete);
                $Commercial->srcImg = $name;
            }
            DB::transaction(function () use ($Commercial, $request) {
                $Commercial->saveOrFail();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($Commercial);
    }

    public function save(RegisterAuthRequest $request)
    {
        try {
            $attributes = $request->all();
            $Commercial = new Commercial($attributes);
            $user = new User();
            $user->email = $request->email;
            $user->password = $request->password;

            $base64_image = $request->srcImg;
            @list($type, $file_data) = explode(';', $base64_image);
            @list(, $type) = explode('/', $type);
            @list(, $file_data) = explode(',', $file_data);
            $data = base64_decode($file_data);
            $name = 'PI-' . auth()->id() . '-' . time() . '.' . $type;
            Storage::disk('profileImgs')->put($name, $data);

            DB::transaction(function () use ($name, $attributes, $user, $Commercial) {
                $user->saveOrFail();
                $user->roles()->sync($attributes['roles']);
                $Commercial->user_id = $user->id;
                $Commercial->logo = $name;
                $Commercial->saveOrFail();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'ana' => $attributes['roles']], 500);
        }
        return response()->json(Commercial::with('agence')->findOrFail($Commercial->id));
    }

    public function delete($id)
    {
        try {
            Commercial::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => false]);
        }
        return response()->json(['message' => true]);
    }
}
