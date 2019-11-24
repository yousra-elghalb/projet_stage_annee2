<?php

namespace App\Console\Commands;

use App\models\OffreVoyageLimited;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class DeleteOffreVoyageLimilted extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:deleteOffreVoyageLimilted';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $v = OffreVoyageLimited::whereDate('optionalDate', Carbon::today())->get();
        OffreVoyageLimited::whereDate('optionalDate', Carbon::today())->update(['visible' => false]);
        Log::info('OffreVoyageLimited supprimés ' . $v);

    }
}
