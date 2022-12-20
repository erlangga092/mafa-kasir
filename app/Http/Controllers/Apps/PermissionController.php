<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $permissions = Permission::when(request()->q, function ($permissions) {
            return $permissions->where('name', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(10);

        return Inertia::render('Apps/Permission/index', [
            'permissions' => $permissions
        ]);
    }
}
