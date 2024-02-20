<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeedBackController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class,'logout']);
    Route::post('update-user-password',[UserController::class,'updateUserPassword']);
    Route::get('get-feedbacks',[FeedBackController::class,'index']);
    Route::post('save-feedback',[FeedBackController::class,'save']);
    Route::post('post-comment',[CommentController::class,'save']);
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('get-all-feedbacks',[FeedBackController::class,'getAllFeedBacks']);
Route::get('get-all-comments',[CommentController::class,'getAllComments']);
