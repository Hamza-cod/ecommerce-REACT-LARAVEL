<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

use App\Models\User;
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

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
// Route::resource('product', ProductController::class)->only(['show', 'index']);
// Route::resource('category', CategoryController::class)->only(['show', 'index']);

// Route::group(['middleware' => ["auth:sanctum"]],function ()  {
    Route::apiResource('product',ProductController::class);
    Route::apiResource('category',CategoryController::class);
    Route::middleware('auth')->apiResource('order',OrderController::class);
    Route::middleware('auth')->get('/orderPerDay',[OrderController::class,'getOrdersPerDay']);
// });


require __DIR__.'/auth.php';
