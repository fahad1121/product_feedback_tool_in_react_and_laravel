<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeedBackRequest;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedBackController extends Controller
{
    public function index()
    {
        $allFeedBacks = Feedback::with('User')->where('user_id',Auth::user()->id)->latest()->paginate(15);
        return response()->json(['success' => true, 'data' => $allFeedBacks],200);
    }
    public function getAllFeedBacks()
    {
        $allFeedBacks = Feedback::latest()->paginate(15);
        return response()->json(['success' => true, 'data' => $allFeedBacks],200);
    }

    public function save(FeedBackRequest $request){
        if($data = $request->validated()){
            $data['user_id'] = Auth::user()->id;
            $feedBackData = Feedback::create($data);
            if($feedBackData->id){
                return response()->json(["success" => true, "message" => "Feedback has been added successfully"],200);
            }
            return response()->json(["success" => false, "message" => "Feedback couldn't added!"],201);
        }
    }
}
