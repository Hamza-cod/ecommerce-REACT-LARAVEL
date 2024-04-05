<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Order::with('product')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>"required|max:20",
            'phone'=>"required|max:24",
            'email'=>"required|email",
            'address'=>"required|max:40",
            'product_id'=>"required|exists:products,id",
            'total'=>"required|numeric|min:1",
            'quantity'=>"required|numeric|min:1",
        ]);
        Order::create($request->all());
        return response()->json([
            'message'=>'ordered seccussfully'
        ]);
    }
    public function getOrdersPerDay(Request $request)
    {
         $ordersPerDay = Order::select(DB::raw("DATE_FORMAT(created_at, '%b %d / %y') as date"), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->take(20)
            ->get();
        $currentDate = Carbon::now()->toDateString();
        $totalOrdersForCurrentDay = Order::whereDate('created_at', $currentDate)->count();
        $totalSales = Order::all(['quantity','total'])
        ->sum(function ($order) {
            return $order->quantity * $order->total;
        });
        $totalSalesForCurrentDay = Order::whereDate('created_at', $currentDate)->get(['quantity','total'])
        ->sum(function ($order) {
            return $order->quantity * $order->total;
        });
        $nbrOrders = Order::count();
        return response()->json([
            'nbrOrders' => $nbrOrders,
            'totalOrdersForCurrentDay' => $totalOrdersForCurrentDay,
            'totalSales' => $totalSales,
            'totalSalesForCurrentDay' => $totalSalesForCurrentDay,
            'data' => $ordersPerDay
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
