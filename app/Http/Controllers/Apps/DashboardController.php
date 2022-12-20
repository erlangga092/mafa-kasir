<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Profit;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $day = date('d');
        $week = Carbon::now()->subDays(7);

        $chart_sales_week = DB::table('transactions')
            ->addSelect(DB::raw('DATE(created_at) as date, SUM(grand_total) as grand_total'))
            ->where('created_at', '>=', $week)
            ->groupBy('date')
            ->get();

        if (count($chart_sales_week)) {
            foreach ($chart_sales_week as $result) {
                $sales_date[] = $result->date;
                $grand_total[] = (int)$result->grand_total;
            }
        } else {
            $sales_date[] = "";
            $grand_total[] = "";
        }

        $count_sales_today = Transaction::whereDay('created_at', $day)->count();
        $sum_sales_today = Transaction::whereDay('created_at', $day)->sum('grand_total');
        $sum_profits_today = Profit::whereDay('created_at', $day)->sum('total');
        $products_limit_stock = Product::with('category')->where('stock', '<=', 10)->get();

        $chart_best_product = DB::table('transaction_details')
            ->addSelect(DB::raw('products.title as title, SUM(transaction_details.qty) as total'))
            ->join('products', 'products.id', '=', 'transaction_details.product_id')
            ->groupBy('transaction_details.product_id')
            ->orderBy('total', 'DESC')
            ->limit(5)
            ->get();

        return Inertia::render('Apps/Dashboard/index', [
            'sales_date' => $sales_date,
            'grand_total' => $grand_total,
            'count_sales_today' => (int) $count_sales_today,

            'sum_sales_today' => (int) $sum_sales_today,
            'sum_profits_today' => (int) $sum_profits_today,
            'products_limit_stock' => $products_limit_stock,
            'chart_best_product' => $chart_best_product
        ]);
    }
}
