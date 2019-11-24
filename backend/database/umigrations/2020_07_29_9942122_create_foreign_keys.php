<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration
{

    public function up()
    {
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->foreign('agence_id')->references('id')->on('agence')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->foreign('voyage_id')->references('id')->on('Voyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->foreign('chauffeur_id')->references('id')->on('chauffeur')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->foreign('vehicule_id')->references('id')->on('vehicule')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('voyageur', function (Blueprint $table) {
            $table->foreign('groupe_convention_id')->references('id')->on('groupe_convention')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('commercial', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('user')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('commercial', function (Blueprint $table) {
            $table->foreign('agence_id')->references('id')->on('agence')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('Voyage', function (Blueprint $table) {
            $table->foreign('categorie_id')->references('id')->on('categorie')
                ->onDelete('set null')
                ->onUpdate('set null');
        });
        Schema::table('Voyage', function (Blueprint $table) {
            $table->foreign('sous_categorie_id')->references('id')->on('sous_categorie')
                ->onDelete('set null')
                ->onUpdate('set null');
        });
        Schema::table('traite', function (Blueprint $table) {
            $table->foreign('paiement_id')->references('id')->on('paiement')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('traite', function (Blueprint $table) {
            $table->foreign('modaliteDePaiement_id')->references('id')->on('modaliteDePaiement')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
        Schema::table('paiement', function (Blueprint $table) {
            $table->foreign('s_groupe_id')->references('id')->on('sGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('paiement', function (Blueprint $table) {
            $table->foreign('p_groupe_id')->references('id')->on('pGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('accompagneur_offreVoyage', function (Blueprint $table) {
            $table->foreign('offreVoyage_id')->references('id')->on('offreVoyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('accompagneur_offreVoyage', function (Blueprint $table) {
            $table->foreign('accompagneur_id')->references('id')->on('accompagneur')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('role_permission', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('role')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('role_permission', function (Blueprint $table) {
            $table->foreign('permission_id')->references('id')->on('permission')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('user_role', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('user')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('user_role', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('role')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('categorie_sous_categories', function (Blueprint $table) {
            $table->foreign('categorie_id')->references('id')->on('categorie')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('categorie_sous_categories', function (Blueprint $table) {
            $table->foreign('sous_categorie_id')->references('id')->on('sous_categorie')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('villeDepart', function (Blueprint $table) {
            $table->foreign('pays_id')->references('id')->on('pays')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('ville_depart_voyage', function (Blueprint $table) {
            $table->foreign('ville_depart_id')->references('id')->on('villeDepart')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('pGroupe', function (Blueprint $table) {
            $table->foreign('ville_id')->references('id')->on('villeDepart')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('ville_depart_voyage', function (Blueprint $table) {
            $table->foreign('voyage_id')->references('id')->on('Voyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('pGroupe', function (Blueprint $table) {
            $table->foreign('offreVoyage_id')->references('id')->on('offreVoyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('pGroupe', function (Blueprint $table) {
            $table->foreign('commercial_id')->references('id')->on('commercial')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->foreign('offreVoyage_id')->references('id')->on('offreVoyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->foreign('groupe_convention_id')->references('id')->on('groupe_convention')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->foreign('commercial_id')->references('id')->on('commercial')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
        Schema::table('voyageur_sGroupe', function (Blueprint $table) {
            $table->foreign('voyageur_id')->references('id')->on('voyageur')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('voyageur_sGroupe', function (Blueprint $table) {
            $table->foreign('s_groupe_id')->references('id')->on('sGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('voyageur_pGroupe', function (Blueprint $table) {
            $table->foreign('voyageur_id')->references('id')->on('voyageur')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('voyageur_pGroupe', function (Blueprint $table) {
            $table->foreign('p_groupe_id')->references('id')->on('pGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('option_pgroupe', function (Blueprint $table) {
            $table->foreign('option_id')->references('id')->on('option')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('option_pgroupe', function (Blueprint $table) {
            $table->foreign('p_groupe_id')->references('id')->on('pGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('option_sgroupe', function (Blueprint $table) {
            $table->foreign('option_id')->references('id')->on('option')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('option_sgroupe', function (Blueprint $table) {
            $table->foreign('s_groupe_id')->references('id')->on('sGroupe')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('offre_voyage_limited', function (Blueprint $table) {
            $table->foreign('offre_voyage_id')->references('id')->on('offreVoyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('offre_voyage_limited', function (Blueprint $table) {
            $table->foreign('commercial_id')->references('id')->on('commercial')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('depenses_offre_voyage', function (Blueprint $table) {
            $table->foreign('offre_voyage_id')->references('id')->on('offreVoyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('depenses_offre_voyage', function (Blueprint $table) {
            $table->foreign('depense_id')->references('id')->on('depense')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('villes_a_visiter', function (Blueprint $table) {
            $table->foreign('voyage_id')->references('id')->on('Voyage')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('villes_a_visiter', function (Blueprint $table) {
            $table->foreign('ville_depart_id')->references('id')->on('villeDepart')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('facture', function (Blueprint $table) {
            $table->foreign('traite_id')->references('id')->on('traite')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('vehicule', function (Blueprint $table) {
            $table->foreign('type_vehicule_id')->references('id')->on('type_vehicule')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('vehicule', function (Blueprint $table) {
            $table->foreign('marque_vehicule_id')->references('id')->on('marque_vehicule')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('vehicule', function (Blueprint $table) {
            $table->foreign('societe_id')->references('id')->on('societe')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('reservation_hotel', function (Blueprint $table) {
            $table->foreign('hotel_id')->references('id')->on('hotel')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
        Schema::table('reservation_hotel', function (Blueprint $table) {
            $table->foreign('offre_voyage_id')->references('id')->on('offreVoyage')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
    }

    public function down()
    {
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->dropForeign('offreVoyage_agence_id_foreign');
        });
        Schema::table('offreVoyage', function (Blueprint $table) {
            $table->dropForeign('offreVoyage_voyage_id_foreign');
        });
        Schema::table('commercial', function (Blueprint $table) {
            $table->dropForeign('commercial_user_id_foreign');
        });
        Schema::table('Voyage', function (Blueprint $table) {
            $table->dropForeign('Voyage_categorie_id_foreign');
        });
        Schema::table('Voyage', function (Blueprint $table) {
            $table->dropForeign('Voyage_sous_categorie_id_foreign');
        });
        Schema::table('traite', function (Blueprint $table) {
            $table->dropForeign('traite_paiement_id_foreign');
        });
        Schema::table('traite', function (Blueprint $table) {
            $table->dropForeign('traite_modaliteDePaiement_id_foreign');
        });
        Schema::table('paiement', function (Blueprint $table) {
            $table->dropForeign('paiement_s_groupe_id_foreign');
        });
        Schema::table('paiement', function (Blueprint $table) {
            $table->dropForeign('paiement_p_groupe_id_foreign');
        });
        Schema::table('accompagneur_offreVoyage', function (Blueprint $table) {
            $table->dropForeign('accompagneur_offreVoyage_offreVoyage_id_foreign');
        });
        Schema::table('accompagneur_offreVoyage', function (Blueprint $table) {
            $table->dropForeign('accompagneur_offreVoyage_accompagneur_id_foreign');
        });
        Schema::table('role_permission', function (Blueprint $table) {
            $table->dropForeign('role_permission_role_id_foreign');
        });
        Schema::table('role_permission', function (Blueprint $table) {
            $table->dropForeign('role_permission_permission_id_foreign');
        });
        Schema::table('user_role', function (Blueprint $table) {
            $table->dropForeign('user_role_user_id_foreign');
        });
        Schema::table('user_role', function (Blueprint $table) {
            $table->dropForeign('user_role_role_id_foreign');
        });
        Schema::table('categorie_sous_categories', function (Blueprint $table) {
            $table->dropForeign('categorie_sous_categories_categorie_id_foreign');
        });
        Schema::table('categorie_sous_categories', function (Blueprint $table) {
            $table->dropForeign('categorie_sous_categories_sous_categorie_id_foreign');
        });
        Schema::table('villeDepart', function (Blueprint $table) {
            $table->dropForeign('villeDepart_pays_id_foreign');
        });
        Schema::table('ville_depart_voyage', function (Blueprint $table) {
            $table->dropForeign('ville_depart_voyage_ville_depart_id_foreign');
        });
        Schema::table('ville_depart_voyage', function (Blueprint $table) {
            $table->dropForeign('ville_depart_voyage_voyage_id_foreign');
        });
        Schema::table('pGroupe', function (Blueprint $table) {
            $table->dropForeign('pGroupe_offreVoyage_id_foreign');
        });
        Schema::table('pGroupe', function (Blueprint $table) {
            $table->dropForeign('pGroupe_commercial_id_foreign');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->dropForeign('sGroupe_offreVoyage_id_foreign');
        });
        Schema::table('sGroupe', function (Blueprint $table) {
            $table->dropForeign('sGroupe_commercial_id_foreign');
        });
        Schema::table('voyageur_sGroupe', function (Blueprint $table) {
            $table->dropForeign('voyageur_sGroupe_voyageur_id_foreign');
        });
        Schema::table('voyageur_sGroupe', function (Blueprint $table) {
            $table->dropForeign('voyageur_sGroupe_s_groupe_id_foreign');
        });
        Schema::table('voyageur_pGroupe', function (Blueprint $table) {
            $table->dropForeign('voyageur_pGroupe_voyageur_id_foreign');
        });
        Schema::table('voyageur_pGroupe', function (Blueprint $table) {
            $table->dropForeign('voyageur_pGroupe_p_groupe_id_foreign');
        });
        Schema::table('option_pgroupe', function (Blueprint $table) {
            $table->dropForeign('option_pgroupe_option_id_foreign');
        });
        Schema::table('option_pgroupe', function (Blueprint $table) {
            $table->dropForeign('option_pgroupe_p_groupe_id_foreign');
        });
        Schema::table('option_sgroupe', function (Blueprint $table) {
            $table->dropForeign('option_sgroupe_option_id_foreign');
        });
        Schema::table('option_sgroupe', function (Blueprint $table) {
            $table->dropForeign('option_sgroupe_s_groupe_id_foreign');
        });
    }
}
