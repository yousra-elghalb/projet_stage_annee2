<?php

namespace App\Console;

use App\models\OffreVoyageLimited;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('command:deleteOffreVoyageLimilted')->daily();
//            ->everyMinute();
        /* $schedule->call(function () {
             $v = OffreVoyageLimited::whereDate('optionalDate', Carbon::today())->get();
             OffreVoyageLimited::whereDate('optionalDate', Carbon::today())->delete();
             Log::info('OffreVoyageLimited supprimés ' . $v);
         })->dailyAt('16:28');*/
//        })

//            ->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
