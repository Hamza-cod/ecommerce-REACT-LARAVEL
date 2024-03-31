<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function __construct()  {
          $this->middleware('auth')->except(['index','show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category:id,name')->get();
        $count = Product::all()->countBy('id');
        return response()->json([
            'products'=>$products,
            "count"=>$count
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $formField = $request->validated();
        $formField['image'] = $request->file('image')->store('/images','public');

        Product::create($formField);

        return response()->json([
            'status'=> 1
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
         $productWithCategory = $product->load('category:id,name');

    return response()->json([
        'product' => $productWithCategory,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateProductRequest $request, Product $product)
{
    // Validate the request data
    // dd($request);
      $validatedData = $request->validated();

    //!! Check if a new image is provided and update it

    if ($request->image!== null) {
        $image =$request->file('image');

        $validatedData['image'] = $image->store('/images', 'public');
     //?   Delete the old image if necessary
    }

    //**  Update the product with the validated form fields
    $product->update($validatedData);

    // **  Optionally, reload the product with the category relationship to include it in the response
    // $productWithCategory = $product->load('category:id,name');

    return response()->json([
        'status' => 'ok' ,
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        Storage::disk('public')->delete($product->image);
        return response()->json([
            'status'=>'ok'
        ]);
    }
}