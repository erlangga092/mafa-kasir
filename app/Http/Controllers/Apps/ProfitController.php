<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Profit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfitController extends Controller
{
    public function index()
    {
        $profits = Profit::with('transaction')
            ->whereDate('created_at', Carbon::today())
            ->latest()
            ->paginate(5);

        $total = Profit::whereDate('created_at', Carbon::today())
            ->sum('total');

        return Inertia::render('Apps/Profit/index', [
            'profits' => $profits,
            'total' => (int)$total
        ]);
    }

    public function filter(Request $request)
    {
        $this->validate($request, [
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $profits = Profit::with('transaction')
            ->whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date)
            ->latest()
            ->paginate(5);

        $total = Profit::whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date)
            ->sum('total');

        return Inertia::render('Apps/Profit/index', [
            'profits' => $profits,
            'total' => (int)$total
        ]);
    }
}
