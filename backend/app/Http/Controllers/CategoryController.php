<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function __construct(){
        $this->middleware('auth')->except(['index','show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorys = Category::all();
        return response()->json([
            'categorys'=>$categorys,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $category = $request->validate([
             'name'=>'unique:categories|required|min:4'
        ]);
        Category::create($category);
        return response()->json([
            'status'=>1
        ]);
        
    }

    

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
             'name'=>'unique:categories|required|min:4'
        ]);
        $category->update($validated);
        return response()->json([
            'status'=>1
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message'=>'category deleted secssefully'
        ]);
    }
}
