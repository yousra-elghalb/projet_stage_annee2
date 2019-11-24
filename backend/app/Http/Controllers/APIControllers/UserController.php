<?php

namespace App\Http\Controllers\APIControllers;


use App\models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public $loginAfterSignUp = true;

    public function changePassword(Request $request)
    {
        $input = $request->all();
        $user = auth()->user();
        if (!Hash::check($input["oldPassword"], $user->password))
            return response()->json(['Error' => 'password Inccorrect'], Response::HTTP_UNPROCESSABLE_ENTITY);
        $user->update(['password' => $input["newPassword"]]);
        return response()->json(['Success' => 'password change avec succe'], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $jwt_token = null;

        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password!!!!',
            ], 401);
        }

//
//        error_log(auth()->user()->role->nom);
//        error_log(auth()->user());

        return response()->json(['token' => $jwt_token,
            'roles' => Auth::user()->roles()->get(),
            'commercial' => Auth::user()->commercial()->get()->first()
        ]);
    }

    public function logout(Request $request)
    {
        $token = JWTAuth::parseToken();

        try {
            JWTAuth::invalidate($token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }

    public function getAuthUser(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);

        return response()->json(['user' => $user]);
    }
}
