<?php

namespace App\Http\Middleware\jwt;

use App\models\PGroupe;
use App\models\SGroupe;
use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommercialAuthorization
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $module)
    {
        try {

            //Access token from the request
            $token = JWTAuth::parseToken();
            //Try authenticating user
            $user = $token->authenticate();
            $Commercial = $user->commercial()->get()->first();
            if ($module == "pgroupe") {
                $PGroupe = PGroupe::findOrFail($request->id);
                if ($PGroupe->commercial_id == $Commercial->id)
                    return $next($request);
            }
            if ($module == "pgroupe-facture") {
                $PGroupe = PGroupe::findOrFail($request->p_groupe_id);
                if ($PGroupe->commercial_id == $Commercial->id)
                    return $next($request);
            }
            if ($module == "sgroupe") {
                $SGroupe = SGroupe::findOrFail($request->id);
                if ($SGroupe->commercial_id == $Commercial->id)
                    return $next($request);
            }
            if ($module == "sgroupe-facture") {
                $SGroupe = SGroupe::findOrFail($request->s_groupe_id);
                if ($SGroupe->commercial_id == $Commercial->id)
                    return $next($request);
            }
            if ($module == "commercialExterneOffreVoyage") {
                if ($Commercial->id == $request->route('id'))
                    return $next($request);
            }
            if ($module == "profile") {
                if ($Commercial->id == $request->id)
                    return $next($request);
            }

//            error_log($module);

        } catch (TokenExpiredException $e) {

            //Thrown if token has expired
            return $this->unauthorized('Your token has expired. Please, login again.');

        } catch
        (TokenInvalidException $e) {

            //Thrown if token invalid
            return $this->unauthorized('Your token is invalid. Please, login again.');

        } catch (JWTException $e) {

            //Thrown if token was not found in the request.
            return $this->unauthorized('Please, attach a Bearer Token to your request');
        }

        //If user was authenticated successfully and user is in one of the acceptable roles, send to next request.
//        if ($user && in_array($user->role, $role)) {
//            return $next($request);
//        }

        return $this->unauthorized();
    }

    private function unauthorized($message = null)
    {
        return response()->json([
            'message' => $message ? $message : 'You are unauthorized to access this resource',
            'success' => false
        ], 401);
    }
}
