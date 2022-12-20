<?php

use App\Http\Controllers\Apps\PermissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// route home
Route::get("/", function () {
    return \Inertia\Inertia::render('Auth/Login/index');
})->middleware('guest');

// prefix apps
Route::prefix('apps')->group(function () {
    // auth
    Route::group(['middleware' => ['auth']], function () {

        // dashboard
        Route::get("/dashboard", \App\Http\Controllers\Apps\DashboardController::class)
            ->name('apps.dashboard');

        // permissions
        Route::get('/permissions', \App\Http\Controllers\Apps\PermissionController::class)
            ->name('apps.permissions')
            ->middleware('permission:permissions.index');

        // roles
        Route::resource('/roles', \App\Http\Controllers\Apps\RoleController::class, [
            'as' => 'apps'
        ])->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

        // users
        Route::resource("/users", \App\Http\Controllers\Apps\UserController::class, [
            'as' => 'apps'
        ])->middleware('permission:users.index|users.create|users.edit|users.delete');

        // categories
        Route::resource('/categories', \App\Http\Controllers\Apps\CategoryController::class, [
            'as' => 'apps'
        ])->middleware('permission:categories.index|categories.create|categories.edit|categories.delete');

        // products
        Route::resource('/products', \App\Http\Controllers\Apps\ProductController::class, [
            'as' => 'apps'
        ])->middleware('permission:products.index|products.create|products.edit|products.delete');

        // customers
        Route::resource('/customers', \App\Http\Controllers\Apps\CustomerController::class, [
            'as' => 'apps'
        ])->middleware('permission:customers.index|customers.create|customers.edit|customers.delete');

        // transactions
        Route::get('/transactions', [\App\Http\Controllers\Apps\TransactionController::class, 'index'])
            ->name('apps.transactions.index')
            ->middleware('permission:transactions.index');

        // transactions - search product
        Route::post('/transactions/searchProduct', [\App\Http\Controllers\Apps\TransactionController::class, 'searchProduct'])
            ->name('apps.transactions.searchProduct');

        // transactions - add to cart
        Route::post('/transactions/add-to-cart', [\App\Http\Controllers\Apps\TransactionController::class, 'addToCart'])
            ->name('apps.transactions.addToCart');

        // transactions - destroy cart
        Route::post('/transactions/destroy-cart', [\App\Http\Controllers\Apps\TransactionController::class, 'destroyCart'])
            ->name('apps.transactions.destroyCart');

        // transaction - store
        Route::post('/transactions/store', [\App\Http\Controllers\Apps\TransactionController::class, 'store'])
            ->name('apps.transactions.store');

        // transactions - print
        Route::get('/transactions/print', [\App\Http\Controllers\Apps\TransactionController::class, 'print'])
            ->name('apps.transactions.print');

        // sales
        Route::get("/sales", [\App\Http\Controllers\Apps\SalesController::class, "index"])
            ->middleware('permission:sales.index')
            ->name('apps.sales.index');

        // sales - filter
        Route::get("/sales/filter", [\App\Http\Controllers\Apps\SalesController::class, "filter"])
            ->name('apps.sales.filter');

        // sales - export
        Route::get("/sales/export", [\App\Http\Controllers\Apps\SalesController::class, "export"])
            ->name('apps.sales.export');

        // profits
        Route::get("/profits", [\App\Http\Controllers\Apps\ProfitController::class, "index"])
            ->middleware('permission:profits.index')
            ->name('apps.profits.index');

        // profits - filter
        Route::get("/profits/filter", [\App\Http\Controllers\Apps\ProfitController::class, "filter"])
            ->name('apps.profits.filter');
    });
});
