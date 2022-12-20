<?php

namespace App\Http\Controllers\Apps;

use App\Exports\SalesExport;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class SalesController extends Controller
{
    public function index()
    {
        $sales = Transaction::with('cashier', 'customer')
            ->whereDate('created_at', Carbon::today())
            ->latest()->paginate(5);

        $total = Transaction::whereDate('created_at', Carbon::today())
            ->whereDate('created_at', Carbon::today())
            ->sum('grand_total');

        return Inertia::render("Apps/Sales/index", [
            'sales' => $sales,
            'total' => $total
        ]);
    }

    public function filter(Request $request)
    {
        $this->validate($request, [
            'start_date' => 'required',
            'end_date' => 'required'
        ]);

        $sales = Transaction::with('cashier', 'customer')
            ->whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date)
            ->latest()
            ->paginate(5);

        $total = Transaction::whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date)
            ->sum('grand_total');

        return Inertia::render('Apps/Sales/index', [
            'sales' => $sales,
            'total' => (int) $total
        ]);
    }

    public function export(Request $request)
    {
        return Excel::download(new SalesExport(
            $request->start_date,
            $request->end_date
        ), 'sales : ' . $request->start_date . ' - ' . $request->end_date . '.xlsx');
    }
}
