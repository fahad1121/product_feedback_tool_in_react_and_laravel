<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getAllComments()
    {
        $allComments = Comment::with('User','Feedback')->latest()->paginate(15);
        return response()->json(["success" => true, "data" => $allComments],200);
    }

    public function save(CommentRequest $request)
    {
        if($data = $request->validated()){
            $data['user_id'] = Auth::user()->id;
            $commentData = Comment::create($data);
            if($commentData->id){
                return response()->json(["success" => true, "message" => "Comment has been added successfully"],200);
            }
            return response()->json(["success" => false, "message" => "Comment couldn't added!"],201);
        }
    }
}
