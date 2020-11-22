$(function(){ 
	
		$('body').on('click','#resetpage_errorconnection',function(e){
            location.reload();
        });
		
		$('body').on('click','#open_modal_message_cible',function(e){
			e.preventDefault();
			$('body #modal_message_cible').modal('show');
        });
		$('body').on('click','#diffusion',function(e){
			e.preventDefault();
			$('body #modal_diffusion').modal('show');
        });
	//*************************************bouton envoyer ma commande *******************************************
		$('body').on('click','button#commander',function(e){
			e.preventDefault();
			var val_dans_repas = $('body select[name="liste_repas"]').val();
			var val_dans_boissons = $('body select[name="liste_boissons"]').val();
            $.ajax({
				url:'https://www.findtagant.online/loginfo_doc/controleur/ajout_commande.php',
				type:'post',
				dataType:'json',
				data:'users_num='+localStorage.getItem('num_users')+'&repas='+val_dans_repas+'&boissons='+val_dans_boissons,
				success:function(data){
					if(confirm('Commande envoyée')){
						$('.retour').trigger('click');
					}
				}
			})
        });
	//*****************************************************************************************************************
	
	//*************************************************recup changement select repas ou boissons****************************	
		$('body').on('change','select[name="liste_repas"],select[name="liste_boissons"]',function(e){
            var th = $(this);
			var val = th.val();
			if(th.attr('name') == 'liste_repas'){
				var val_dans_boissons = $('body select[name="liste_boissons"]').val();
				val_dans_boissons = (val_dans_boissons == '')?0:sessionStorage.getItem(val_dans_boissons);
				if(val == ''){
					$('body #total_cmd').text(parseInt(val_dans_boissons)+' €');
					$('body .td_affiche_montant_repas').text('');
				}else{
					$('body .td_affiche_montant_repas').text(sessionStorage.getItem(val)+' €');
					$('body #total_cmd').text(parseInt(val_dans_boissons)+parseInt(sessionStorage.getItem(val))+' €');
				}
			}else{
				var val_dans_repas = $('body select[name="liste_repas"]').val();
				val_dans_repas = (val_dans_repas == '')?0:sessionStorage.getItem(val_dans_repas);
				if(val == ''){
					$('body #total_cmd').text(parseInt(val_dans_repas)+' €');
					$('body .td_affiche_montant_boissons').text('');
				}else{
					$('body .td_affiche_montant_boissons').text(sessionStorage.getItem(val)+' €');
					$('body #total_cmd').text(parseInt(val_dans_repas)+parseInt(sessionStorage.getItem(val))+' €');
				}
				
			}
			
        });
	//****************************************************************************************************************
	
	//********************************permet d'envoyer un repas ou boissons a ajouter******************************
	
		$('body').on('click','.btn_envoi_menu',function(e){
            e.preventDefault();
			var th = $(this);
			var nom = th.attr('name');
			if(nom == 'btn_repas'){
				var repas = $('body textarea[name="repas"]').val();
				var prix = $('body input[name="prix_repas"]').val();
				$.ajax({
					url:'https://www.findtagant.online/loginfo_doc/controleur/ajout_menu.php',
					type:'post',
					dataType:'json',
					data:'designation=repas&repas='+repas+'&prix_repas='+prix,
					success:function(data){
						alert('envoyé');
					}
				})
				var elementss = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
									<button class="form-control btn btn-default">'+repas+' -> '+prix+' € <span style="color:red" class="pull-right glyphicon glyphicon-trash"></span></button>\
								</div>';
				$('body div#legend_repas').prepend(elementss);
				$('body button.btn_ajout_menu[name="repas"]').removeAttr('style');
				$('body div[name="div_ajout_repas"]').attr('style','display:none');
				
				
			}else{
				var boissons = $('body textarea[name="boissons"]').val();
				var prix = $('body input[name="prix_boissons"]').val();
				$.ajax({
					url:'https://www.findtagant.online/loginfo_doc/controleur/ajout_menu.php',
					type:'post',
					dataType:'json',
					data:'designation=boissons&boissons='+boissons+'&prix_boissons='+prix,
					success:function(data){
						alert('envoyé');
					}
				})
				var elementss = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
									<button class="form-control btn btn-default">'+boissons+' -> '+prix+' € <span style="color:red" class="pull-right glyphicon glyphicon-trash"></span></button>\
								</div>';
				$('body div#legend_boissons').prepend(elementss);
				$('body button.btn_ajout_menu[name="boissons"]').removeAttr('style');
				$('body div[name="div_ajout_boissons"]').attr('style','display:none');
			}
        });
	//*************************************************************************************************************************
	
	//****************************affiche champs saisie nouveau menu(repas, boissons)**********************
	
		$('body').on('click','.btn_ajout_menu',function(e){
            e.preventDefault();
			var th = $(this);
			var nom = th.attr('name');
			if(nom == 'repas'){
				$('body div[name="div_ajout_repas"]').removeAttr('style','display:none');
				th.attr('style','display:none');
			}else if(nom == 'boissons'){
				$('body div[name="div_ajout_boissons"]').removeAttr('style','display:none');
				th.attr('style','display:none');
			}
        });
	//*******************************************************************************************************
	
		$('body').on('click','#masquepage',function(e){
			if(sessionStorage.getItem('parametreouvert') == 'oui'){
				 $('#afficheparametre').attr('style','display:none');
				$('body #masquepage').attr('style','display:none');
				$('body #masquepage').css({
				   'z-index':'4000'
			   });
			   sessionStorage.setItem('parametreouvert','non');
			}
           
        });
		
		$('body').on('click','#btnparametre',function(e){
			sessionStorage.setItem('parametreouvert','oui');
           $('#afficheparametre').removeAttr('style');
			if(localStorage.getItem('droit_num') == '1' ){ //admin
				$('#mon_acces').removeAttr('style');
			}else if(localStorage.getItem('droit_num') == '3' ){  //gastronome
				$('#mon_acces').removeAttr('style');
			}
		   $('body #masquepage').removeAttr('style');
		   $('body #masquepage').css({
			   'z-index':'4500'
		   });
        });
		//******************soumission form enregistrement_heure******
			$('body').tagant_sauvegarde_enregistrement('#form_date_enregistrement','submit');
			$('body').tagant_sauvegarde_enregistrement('#form_heure_debut','submit');
			$('body').tagant_sauvegarde_enregistrement('#form_heure_fin','submit');
		//************************************************************************
		$('.collapse').collapse()
		//******************affiche_les_enregistrement****************************************
		
		//*******************************affiche_mois_annees********************************
			$('body').on('click','#bouton_affiche_liste_des_heurs',function(e){
				e.preventDefault();
				var th = $(this);
				 var nom = th.attr('name');
				 var elementss= '<form action ="" method="post" id="form_ajout_les_mois_heures">';
				 if(nom == 'voir_mois_annees'){
					$('body #affiche_mois_heures').modal('show');
					var mois = new Array();
					var annees = new Array();
				 }
			   $.ajax({
					url:'https://www.findtagant.online/loginfo_doc/controleur/recup_heure.php',
					type:'post',
					dataType:'json',
					data:'users_num='+localStorage.getItem('num_users'),
					success:function(data){
						var verifie = new Array();
						if(nom == 'voir_mois_annees'){
							for(var i in data){
								for(var j in data[i]){
									if(j == 'datess'){
										var datess = new Date(data[i][j]);
										mois[i] = datess.getMonth()+1;
										annees[i] = datess.getFullYear();
										function pad(s) { return (s < 10) ? '0' + s : s; }
										var mois_annee = pad(mois[i])+' / '+annees[i];
										var inc = 0;
										for(var h in verifie){
											if(mois_annee == verifie[h]){
												inc++;
											}
										}
										if(inc ==0){
											verifie.push(mois_annee);
											elementss += '<div class="btn input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
														<button name="'+mois_annee+'" class="bouton_mois_annees form-control">'+mois_annee+'</button>\
													</div>\
												';
										}
										
									}
								}
							}
							elementss += '</form>';
							$('body div#corps_affiche_mois_heures').html(elementss);
							elementss = '';
						}

					}
				})
				
			});
			
		//************************************affiche jour mois annees****************************************
			
			$('body').on('click','.bouton_mois_annees',function(e){
				e.preventDefault();
				var th = $(this);
				 var nom = th.attr('name');
				 var elementss= '<form action ="" method="post" id="form_ajout_les_mois_heures">';
									
									
				 function pad(s) { return (s < 10) ? '0' + s : s; }
				 
				 var heure_debut = '';
				 var heure_fin_avec_pause = '';
				 var heure_fin = '';
				 var heure_supp_jour = [];
				 var heure_supp_nuit = [];
				 var heure_tarif_jour = [];
				 var heure_tarif_nuit = [];
				 
				 var j_m_a = '';
				 let datess = '';
				 let madate_de_deletion = '';
						
			   $.ajax({
					url:'https://www.findtagant.online/loginfo_doc/controleur/recup_heure.php',
					type:'post',
					dataType:'json',
					data:'users_num='+localStorage.getItem('num_users'),
					success:function(data){
							for(var i in data){
								var vv= 0 ;
								for(var j in data[i]){
									if(j == 'datess'){
										datess = new Date(data[i][j]);
										madate_de_deletion = data[i][j];
										
										 j_m_a = pad(datess.getDate())+' / '+pad(datess.getMonth()+1)+' / '+pad(datess.getFullYear());
										 vv= pad(datess.getMonth()+1)+' / '+pad(datess.getFullYear());
 										
									}else if(j == 'heure_debut'){
										heure_debut = data[i][j];
									}else if(j == 'heure_fin'){
										heure_fin = data[i][j];
									}
								}
								
								
								//********************************mes fonctions*********************************************
										function getDateFromHours(time) {
											time = time.split(':');
											let now = new Date();
											return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
										}
										function dateDiff(date1, date2){	//
												var diff = {}                           // Initialisation du retour
												var tmp = date2 - date1;
												tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
												diff.sec = tmp % 60;                    // Extraction du nombre de secondes
												tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
												diff.min = tmp % 60;                    // Extraction du nombre de minutes
											 
												tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
												diff.hour = tmp % 24;                   // Extraction du nombre d'heures
												 
												tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
												diff.day = tmp;
												 
												return diff;
										}
										function dateSom(tab_donnee){	//
												var somme_heures = 0;
												var somme_minutes = 0;
												for(var z in tab_donnee){
													somme_heures += tab_donnee[z].getHours();
													somme_minutes += tab_donnee[z].getMinutes();
												}
												return somme_heures+' h '+somme_minutes;
										}
										
									//********************************************************************
									
									if( vv== nom ){
											
						//**************************************************************gere le calcul d'heures*************************************************
										heure_fin_avec_pause = heure_fin;
										heure_fin = dateDiff(getDateFromHours('00:30:00'),getDateFromHours(heure_fin));
										heure_fin = heure_fin.hour+':'+heure_fin.min+':00';
										let only_heure_d = parseInt(getDateFromHours(heure_debut).getHours()); // 20h50 only_heure_d = 20
										let only_heure_f = parseInt(getDateFromHours(heure_fin).getHours());
										
									// si fini a plus de minuit fait correspondre ex: 2h => 26h
										let nombre_correspondant_à_heure_h_f = 0;
										var reference_heure = [{0:24},{1:25},{2:26},{3:27},{4:28},{5:29},{6:30}];
										for(var i in reference_heure){
											for(var j in reference_heure[i]){
												if(j == only_heure_f){
													nombre_correspondant_à_heure_h_f = reference_heure[i][j];
												}
											}
										}
									//*****************************************************************
										
										if(only_heure_f >= 6 && 21- only_heure_f > 0){ // si on termine a moins de 21 heures
										
											var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(heure_fin));
											if(heure_travaille.hour > 7){
												heure_tarif_jour.push(getDateFromHours('07:00:00'));
												heure_supp_jour.push(getDateFromHours((heure_travaille.hour - 7)+':'+heure_travaille.min+':00'));
											}else{
												heure_tarif_jour.push(getDateFromHours(heure_travaille.hour+':'+heure_travaille.min+':00'));
											}
										}else{ // si on termine a plus de 21 heures
										
											//****************l heure de fin *****************
												var h_f = 0;
												if(nombre_correspondant_à_heure_h_f != 0){ //si on fini a plus de 24 h
													 h_f = nombre_correspondant_à_heure_h_f;
												}else{
													 h_f = only_heure_f;
												}
												var m_f = getDateFromHours(heure_fin).getMinutes()
											//************************************
											
											//****************l heure de debut **************
												var h_d = only_heure_d;
												// var m_d = getDateFromHours(heure_debut).getMinutes()
											//************************************
											
											//*******************
												if(h_d <= 21){
													var di0 = dateDiff(getDateFromHours(heure_debut),getDateFromHours('21:00:00'));
													
													if(di0.hour > 7){
														heure_supp_jour.push(getDateFromHours(di0.hour - 7+':'+di0.min+':00'));
														heure_tarif_jour.push(getDateFromHours('07:00:00'));
													}else{
														heure_tarif_jour.push(getDateFromHours(di0.hour + ':'+ di0.min+':00'));
													}
													
													var heure_en_plus = 0;
													//le calcul de la diff d heure se fait avk les heures <= 24 
													
													if(h_f >= 24){
														 heure_en_plus = h_f-24;
														 h_f = 24;
														 var nouvelle_heure_fin= h_f+':'+m_f+':00';
														 var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(nouvelle_heure_fin));
														 
														 var heure_travaille_partir_21 = dateDiff(getDateFromHours('21:00:00'),getDateFromHours(nouvelle_heure_fin));
														 
														 
														 var di2 = dateDiff(getDateFromHours(heure_debut),getDateFromHours(nouvelle_heure_fin));
														 
														if(di0.hour >7){
															 heure_supp_nuit.push(getDateFromHours(heure_travaille_partir_21.hour+heure_en_plus+':'+heure_travaille_partir_21.min+':00'));
														 
														}else if((heure_travaille.hour + heure_en_plus) >= 7){
															heure_supp_nuit.push(getDateFromHours((heure_travaille.hour - 7 + heure_en_plus)+':'+heure_travaille.min+':00'));
															
															var param1 = getDateFromHours((heure_travaille.hour - 7 + heure_en_plus)+':'+heure_travaille.min+':00');
															var param2 = getDateFromHours(heure_travaille_partir_21.hour+heure_en_plus+':'+heure_travaille_partir_21.min+':00');
															var tt = dateDiff(param1,param2);
															
															heure_tarif_nuit.push(getDateFromHours((tt.hour)+':'+tt.min+':00'));
 														 }else{
															heure_tarif_nuit.push(getDateFromHours((heure_travaille_partir_21.hour+heure_en_plus)+':'+heure_travaille_partir_21.min+':00'));
														 }
														 
													}else{
														var di = dateDiff(getDateFromHours('21:00:00'),getDateFromHours(heure_fin));
														 var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(heure_fin));
														 
														if(di0.hour >7){
															 heure_supp_nuit.push(getDateFromHours(di.hour+':'+di.min+':00'));
														 
														}else if(heure_travaille.hour >= 7){
															heure_supp_nuit.push(getDateFromHours((heure_travaille.hour - 7)+':'+heure_travaille.min+':00'));
															var tt = dateDiff(getDateFromHours((heure_travaille.hour - 7)+':'+heure_travaille.min+'00'),getDateFromHours(di.hour+':'+di.min+':00'));
															heure_tarif_nuit.push(getDateFromHours(tt.hour+':'+tt.min+':00'));
														 }else{
															heure_tarif_nuit.push(getDateFromHours(di.hour+':'+di.min+':00'));
														 }
													}
												}else{ // si j ai commencé a plus de 21
													alert('les prises de poste à partir de 21 h ne sont pas pris en compte');
												}
											//********************************************
										}
							//*****************************************************************************************************************************************
								
											elementss += '<div class="btn input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
															<button" name="'+j_m_a+'" id="'+madate_de_deletion+'" class="bouton_vers_heure form-control">'+j_m_a+'<span style="color:red" name="jour" class="delete_heures pull-right glyphicon glyphicon-trash"></span></button>\
														</div>';
									}
							}
							
							elementss += '</form>';
							var text_to_add = '<div style="text-align:left" class="btn col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
										<div class="alert alert-info"><center>Détail mois du '+nom+'</center></div>\
										<p>heures tarif jour : <strong>'+dateSom(heure_tarif_jour)+'</strong></p>\
										<p>heures tarif nuit : <strong>'+dateSom(heure_tarif_nuit)+'</strong></p>\
										<p>heure supplémentairess jour : <strong>'+dateSom(heure_supp_jour)+'</strong></p>\
										<p>heures supplémentaires nuit : <strong>'+dateSom(heure_supp_nuit)+'</strong></p>\
									</div>'+elementss;
							
							$('body div#corps_affiche_mois_heures').html(text_to_add);
							elementss = '';
							
					}
				})
			});
			
			//****************************affiche les heures selon la periode*************
			
			$('body').on('click','.bouton_vers_heure',function(e){
				e.preventDefault();
				var th = $(this);
				 var nom = th.attr('name');
				 var elementss= '<form action ="" method="post" id="form_ajout_les_mois_heures">';
				 
			   $.ajax({
					url:'https://www.findtagant.online/loginfo_doc/controleur/recup_heure.php',
					type:'post',
					dataType:'json',
					data:'users_num='+localStorage.getItem('num_users'),
					success:function(data){
						var heure_debut = 0;
						var heure_fin_avec_pause = 0;
						var heure_fin = 0;
						var heure_supp_jour = 0;
						var heure_supp_nuit = 0;
						var heure_tarif_jour = 0;
						var heure_tarif_nuit = 0;
						var j_m_a = '';
						let datess = '';
						function pad(s) { return (s < 10) ? '0' + s : s; }
							for(var i in data){
								for(var j in data[i]){
									if(j == 'datess'){
										 datess = new Date(data[i][j]);
										 j_m_a = pad(datess.getDate())+' / '+pad(datess.getMonth()+1)+' / '+pad(datess.getFullYear());
									}else if(j == 'heure_debut'){
										heure_debut = data[i][j];
									}else if(j == 'heure_fin'){
										heure_fin = data[i][j];
									}
								}
									//********************************mes fonctions*********************************************
										function getDateFromHours(time) {
											time = time.split(':');
											let now = new Date();
											return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
										}
										function dateDiff(date1, date2){	//
												var diff = {}                           // Initialisation du retour
												var tmp = date2 - date1;
												tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
												diff.sec = tmp % 60;                    // Extraction du nombre de secondes
												tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
												diff.min = tmp % 60;                    // Extraction du nombre de minutes
											 
												tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
												diff.hour = tmp % 24;                   // Extraction du nombre d'heures
												 
												tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
												diff.day = tmp;
												 
												return diff;
										}
									//********************************************************************
									
									if(nom == j_m_a){
										heure_fin_avec_pause = heure_fin;
										heure_fin = dateDiff(getDateFromHours('00:30:00'),getDateFromHours(heure_fin));
										heure_fin = heure_fin.hour+':'+heure_fin.min+':00';
										let only_heure_d = parseInt(getDateFromHours(heure_debut).getHours()); // 20h50 only_heure_d = 20
										let only_heure_f = parseInt(getDateFromHours(heure_fin).getHours());
										
									// si fini a plus de minuit fait correspondre ex: 2h => 26h
										let nombre_correspondant_à_heure_h_f = 0;
										var reference_heure = [{0:24},{1:25},{2:26},{3:27},{4:28},{5:29},{6:30}];
										for(var i in reference_heure){
											for(var j in reference_heure[i]){
												if(j == only_heure_f){
													nombre_correspondant_à_heure_h_f = reference_heure[i][j];
												}
											}
										}
									//*****************************************************************
										
										if(only_heure_f >= 6 && 21- only_heure_f > 0){ // si on termine a moins de 21 heures
										
											var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(heure_fin));
											if(heure_travaille.hour > 7){
												heure_tarif_jour = 7+' h';
												heure_supp_jour = (heure_travaille.hour - 7)+' h '+heure_travaille.min+' min';
											}else{
												heure_tarif_jour = heure_travaille.hour+' h '+heure_travaille.min+' min';
											}
										}else{ // si on termine a plus de 21 heures
										
											//****************l heure de fin *****************
												var h_f = 0;
												if(nombre_correspondant_à_heure_h_f != 0){ //si on fini a plus de 24 h
													 h_f = nombre_correspondant_à_heure_h_f;
												}else{
													 h_f = only_heure_f;
												}
												var m_f = getDateFromHours(heure_fin).getMinutes()
											//************************************
											
											//****************l heure de debut **************
												var h_d = only_heure_d;
												// var m_d = getDateFromHours(heure_debut).getMinutes()
											//************************************
											
											//*******************
												if(h_d <= 21){
													var di0 = dateDiff(getDateFromHours(heure_debut),getDateFromHours('21:00:00'));
													
													if(di0.hour > 7){
														heure_supp_jour = di0.hour - 7+' h '+di0.min+' min';
														heure_tarif_jour = 7;
													}else{
														heure_tarif_jour = di0.hour + ' h '+ di0.min+' min';
													}
													
													var heure_en_plus = 0;
													//le calcul de la diff d heure se fait avk les heures <= 24 
													
													if(h_f >= 24){
														 heure_en_plus = h_f-24;
														 h_f = 24;
														 var nouvelle_heure_fin= h_f+':'+m_f+':00';
														 var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(nouvelle_heure_fin));
														 
														 var heure_travaille_partir_21 = dateDiff(getDateFromHours('21:00:00'),getDateFromHours(nouvelle_heure_fin));
														 
														 
														 var di2 = dateDiff(getDateFromHours(heure_debut),getDateFromHours(nouvelle_heure_fin));
														 
														if(di0.hour >7){//car on ne peut plus dans ce cas avoir les heures tarif de nuit car depassé 7 heures donc rest heures supp
															 heure_supp_nuit = heure_travaille_partir_21.hour+heure_en_plus+' h '+heure_travaille_partir_21.min+' min';
														 
														}else if((heure_travaille.hour + heure_en_plus) >= 7){
															// heure_tarif_nuit = 7 - heure_tarif_jour +' h';
															heure_supp_nuit = (heure_travaille.hour - 7 + heure_en_plus)+' h '+heure_travaille.min+' min';
															
															var param1 = getDateFromHours((heure_travaille.hour - 7 + heure_en_plus)+':'+heure_travaille.min+':00');
															var param2 = getDateFromHours(heure_travaille_partir_21.hour+heure_en_plus+':'+heure_travaille_partir_21.min+':00');
															var tt = dateDiff(param1,param2);
															
															heure_tarif_nuit = (tt.hour)+' h '+tt.min+' min';
 														 }else{
															heure_tarif_nuit = (heure_travaille_partir_21.hour+heure_en_plus)+' h '+heure_travaille_partir_21.min+' min';
														 }
														 
													}else{
														var di = dateDiff(getDateFromHours('21:00:00'),getDateFromHours(heure_fin));
														 var heure_travaille =  dateDiff(getDateFromHours(heure_debut),getDateFromHours(heure_fin));
														 
														if(di0.hour >7){
															 heure_supp_nuit = di.hour+' h '+di.min+' min';
														 
														}else if(heure_travaille.hour >= 7){
															heure_supp_nuit = (heure_travaille.hour - 7)+' h '+heure_travaille.min+' min';
															var tt = dateDiff(getDateFromHours((heure_travaille.hour - 7)+':'+heure_travaille.min+':00'),getDateFromHours(di.hour+':'+di.min+':00'));
															heure_tarif_nuit = tt.hour+'h '+tt.min+' min';
														}else{
															heure_tarif_nuit = di.hour+' h '+di.min+' min';
														 }
													}
												}else{ // si j ai commencé a plus de 21
													alert('les prises de poste à partir de 21 h ne sont pas pris en compte');
												}
											//********************************************
											
										}
										
										
											elementss += '<h4 class="alert alert-success"><center><span class="langue">Detail de la journée</span></br><span style="font-size:0.4em;color:red" class="langue"></span></center></h4>\
																<form action ="" method="post" id="affiche_detail_journee">\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heures de debut</span><span class="obligatoire"></span>: '+heure_debut+'</span>\
																	</div>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heure de fin</span><span class="obligatoire"></span>: '+heure_fin_avec_pause+'</span>\
																	</div>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">temps de pause</span><span class="obligatoire"></span>: 30 min (non payé)</span>\
																	</div><br>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heures tarif jour</span><span class="obligatoire"></span>: '+heure_tarif_jour+'</span>\
																	</div>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heures tarif nuit</span><span class="obligatoire"></span>: '+heure_tarif_nuit+'</span>\
																	</div>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heures supplémentaires jour</span><span class="obligatoire"></span>: '+heure_supp_jour+'</span>\
																	</div>\
																	<div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
																		<span class="input-group-addon"><span class="langue">Heures supplémentaires nuit</span><span class="obligatoire"></span>: '+heure_supp_nuit+'</span>\
																	</div>\
																</form>';
															
									}
								}
							elementss += '</form>';
							$('body div#corps_affiche_mois_heures').html(elementss);
							elementss = '';
					}
				})
			});
			
			//***************************************************************************************
			
			
		
		//**************************************************************************
		
			//************************bouton annuler*******************************
			
			$('body').on('click','.annuler',function(e){
				e.preventDefault();
				var th = $(this);
				var nom = th.attr('name');
				if(nom == 'date_enregistrement'){
					localStorage.removeItem('date_enregistrement');
					$("form#form_date_enregistrement input[name='datess']").val('');
					
					var elementss =' <button type ="submit" class="btn btn-info">\
										<span class="glyphicon glyphicon-hand-right"></span> \
										<span class="langue" name="heure_debut">Valider</span>\
									</button>' ;
						$("form#form_"+nom+" button[type='submit']").replaceWith(elementss);
				}else if(nom == 'heure_debut'){
					localStorage.removeItem('heure_debut');
					$("form#form_heure_debut input[name='datess']").val('');
					var elementss =' <button type ="submit" class="btn btn-info">\
										<span class="glyphicon glyphicon-hand-right"></span> \
										<span class="langue" name="heure_debut">Valider</span>\
									</button>' ;
						$("form#form_"+nom+" button[type='submit']").replaceWith(elementss);
				}
				else if(nom == 'heure_fin'){
					localStorage.removeItem('heure_fin');
					$("form#form_heure_fin input[name='datess']").val('');
					var elementss =' <button type ="submit" class="btn btn-info">\
										<span class="glyphicon glyphicon-hand-right"></span> \
										<span class="langue" name="heure_debut">Valider</span>\
									</button>' ;
						$("form#form_"+nom+" button[type='submit']").replaceWith(elementss);
				}
			});
		
		//**********************************************************************
		
		//**********************soumet formulaire enregistrement heures**************
			$('body').on('click','#bouton_enregistrement_heure',function(e){
				e.preventDefault();
				
				if(localStorage.getItem('date_enregistrement') != null && localStorage.getItem('heure_debut') != null && localStorage.getItem('heure_fin') != null){
					if(confirm('Êtes vous sûrs des informations entrées ? Si oui cliquer sur Ok sinon sur Annuler')){
						$.ajax({
							url:'https://www.findtagant.online/loginfo_doc/controleur/enregistrement_heure.php',
							type:'post',
							dataType:'json',
							data:'users_num='+localStorage.getItem('num_users')+'&datess='+localStorage.getItem('date_enregistrement')+'&heure_debut='+localStorage.getItem('heure_debut')+'&heure_fin='+localStorage.getItem('heure_fin'),
							success:function(data){
								localStorage.removeItem('date_enregistrement');
								localStorage.removeItem('heure_debut');
								localStorage.removeItem('heure_fin');
								var elementss =' <button type ="submit" class="btn btn-info">\
										<span class="glyphicon glyphicon-hand-right"></span> \
										<span class="langue annuler" name="heure_debut">Valider</span>\
									</button>' ;
								$("form button[type='submit']").each(function(){
									$(this).replaceWith(elementss);
								})
								$('.retour').trigger('click');
							}
						})
					}
				}else{
					alert('Veuillez d\'abord remplir tous les champs en haut');
				}
				
			});
		//***************************************************************************
		
		$('body').tagant_submit_form('#form_enregistrement');
		$('body').tagant_submit_form('#form_connexion');
		$('body').tagant_submit_form('#form_diffusion');
		$('body').tagant_submit_form('#form_send_response');
		$('body').tagant_submit_form('#form_compte');
		$('body').tagant_affiche_infos('.boutonaccueil','click');
		$('body').tagant_affiche_infos('.boutonselect','change');
		$('body').tagant_affiche_infos('.retour','click');
		       
	
	
	$('body').on('click','button#modifier_menu',function(e){
		e.preventDefault();
		var mes_repas = '';
		var mes_boissons = '';
		 $.ajax({
			url:'https://www.findtagant.online/loginfo_doc/controleur/recup_menu.php',
			type:'post',
			dataType:'json',
			data:'',
			success:function(data){
				for(var a in data){
					if(a == 'repas'){
						for(var b in data[a]){
							var repas = '';
							var prix_repas = '';
							for(var c in data[a][b]){
								if(c =='repas'){
									repas = data[a][b][c];
								}else if(c == 'prix_repas'){
									prix_repas = data[a][b][c];
								}
							}
							mes_repas += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
										<button class="form-control btn btn-default" name="'+repas+'">'+repas+' -> '+prix_repas+' € <span style="color:red" name="menu_repas" class="delete_menu pull-right glyphicon glyphicon-trash"></span></button>\
									</div>';
						}
					}else if(a =='boissons'){
						for(var b in data[a]){
							var boissons = '';
							var prix_boissons = '';
							for(var c in data[a][b]){
								if(c =='boissons'){
									boissons = data[a][b][c];
								}else if(c == 'prix_boissons'){
									prix_boissons = data[a][b][c];
								}
							}
							mes_boissons += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
										<button class="form-control btn btn-default" name="'+boissons+'">'+boissons+' -> '+prix_boissons+' € <span style="color:red" name="menu_boissons" class="delete_menu pull-right glyphicon glyphicon-trash"></span></button>\
									</div>';
						}
					}
					
				}
				mes_repas += '<div style="display:none;border:2px solid black" name="div_ajout_repas" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
										<center><label>Repas:<textarea name="repas" class="form-control"></textarea></label></center>\
										<center><label>Prix:<input type="number" name="prix_repas" class="form-control"></label></center><br>\
										<button name="btn_repas" class="btn_envoi_menu btn btn-success"><span class="glyphicon glyphicon-ok-sign"> OK</span></button>\
									</div>';
				mes_boissons += '<div style="display:none;border:2px solid black" name="div_ajout_boissons" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">\
										<center><label>Boissons:<textarea name="boissons" class="form-control"></textarea></label></center>\
										<center><label>Prix:<input type="number" name="prix_boissons" class="form-control"></label></center><br>\
										<button name="btn_boissons" class="btn_envoi_menu btn btn-success"><span class="glyphicon glyphicon-ok-sign"> OK</span></button>\
									</div>';
				$('body #legend_repas').html(mes_repas);
				$('body #legend_boissons').html(mes_boissons);
			}
		})
       $('body #modal_menu').modal('show');
    });
	
	$('body').on('click','span.delete_menu',function(e){
		e.preventDefault();
		var th = $(this);
		var repas_ou_boissons = th.attr('name');
		var son_nom = th.parent().attr('name');
		if(confirm('Voulez-vous supprimer cet élement')){
			$.ajax({
				url:'https://www.findtagant.online/loginfo_doc/controleur/delete_menu.php',
				type:'post',
				dataType:'json',
				data:'repas_ou_boissons='+repas_ou_boissons+'&son_nom='+son_nom,
				success:function(data){
					alert('supprimé');
					th.parent().parent().remove();
				}
			})
		}
    });
	
	
	$('body').on('click','button#voir_commandes',function(e){
		e.preventDefault();
		$('body #modal_commandes').modal('show');
		var affiche_repas ='';
		var affiche_boissons ='';
		var repas_tab = {
			'repas':[],
			'quantite':{}
		};
		var boissons_tab = {
			'boissons':[],
			'quantite':{}
		};
		var noms_repas_tab = {};
		var noms_boissons_tab = {};
		$.ajax({
			url:'https://www.findtagant.online/loginfo_doc/controleur/recup_commandes.php',
			type:'post',
			dataType:'json',
			data:'',
			success:function(data){
				for(var a in data){
					var r = '';
					var bo = '';
					var users = '';
					for(var b in data[a]){
						if(b == 'repas_num'){
							r = data[a][b];
							if(repas_tab['repas'].indexOf(data[a][b]) == -1){ 
								repas_tab['repas'].push(data[a][b]);
								repas_tab['quantite'][data[a][b]] = 1;
							}else{
								repas_tab['quantite'][data[a][b]] += 1;
							}
						}else if(b == 'bss_num'){
							bo= data[a][b];
							if(boissons_tab['boissons'].indexOf(data[a][b]) == -1){
								boissons_tab['boissons'].push(data[a][b]);
								boissons_tab['quantite'][data[a][b]] = 1;
							}else{
								boissons_tab['quantite'][data[a][b]] += 1;
							}
						}else if(b == 'users_num'){
							users= data[a][b];
						}
					}
					if(r != ''){
						if(typeof(noms_repas_tab[r]) != 'undefined'){
							 noms_repas_tab[r].push(users);
						}else{
							noms_repas_tab[r] = [users];
						}
					}
					if(bo != ''){
						if(typeof(noms_boissons_tab[bo]) != 'undefined'){
							 noms_boissons_tab[bo].push(users);
						}else{
							noms_boissons_tab[bo] = [users];
						}
					}
				}
				
				for(var z in repas_tab){
					if(z == 'repas'){
						for(var za in repas_tab[z]){
							var mon_repas = repas_tab[z][za];
							var quantite_repas = 0;
							var liste_personne = '';
							for(var zb in repas_tab['quantite']){
								if(zb == mon_repas){
									quantite_repas = repas_tab['quantite'][zb];
								}
							}
							for(var zc in noms_repas_tab[mon_repas]){
								liste_personne += '<option>'+noms_repas_tab[mon_repas][zc]+'</option>';
							}
							
							affiche_repas += '<tr>\
												<td>\
													<span class="pull-left">'+mon_repas+'</span> <span style="background-color:blue" class="pull-right badge">'+quantite_repas+'</span>\
												</td>\
												<td>\
													<select class="form-control">'+liste_personne+'</select>\
												</td>\
											</tr>';
						}
						
					}
				}	
				for(var z in boissons_tab){
					 if(z == 'boissons'){
						for(var za in boissons_tab[z]){
							var ma_boissons = boissons_tab[z][za];
							var quantite_boissons = 0;
							var liste_personne = '';
							for(var zb in boissons_tab['quantite']){
								if(zb == ma_boissons){
									quantite_boissons = boissons_tab['quantite'][zb];
								}
							}
							for(var zc in noms_boissons_tab[ma_boissons]){
								liste_personne += '<option>'+noms_boissons_tab[ma_boissons][zc]+'</option>';
							}
							
							affiche_boissons += '<tr>\
												<td>\
													<span class="pull-left">'+ma_boissons+'</span> <span style="background-color:blue" class="pull-right badge">'+quantite_boissons+'</span>\
												</td>\
												<td>\
													<select class="form-control">'+liste_personne+'</select>\
												</td>\
											</tr>';
						}
						
						
					}
				}
				$('body #corps_tableau_commande_repas').html(affiche_repas);
				$('body #corps_tableau_commande_boissons').html(affiche_boissons);
			}
		})
    })
	
	$('body').on('click','.affichermdp',function(e){
			e.preventDefault();
			var th = $(this);
			var parentss = th.parent();
			if(parentss.children('input.mdp').hasClass('invisibless')){
				var valeur = parentss.children('input.mdp').val();
				parentss.children('input.mdp').attr('type','text');
				parentss.children('input.mdp').attr('value',valeur);
				parentss.children('input.mdp').removeClass('invisibless');
				parentss.children('input.mdp').addClass('visibless');
				th.children('span').removeClass('glyphicon-eye-close');
				th.children('span').addClass('glyphicon-eye-open');
			}else{
				parentss.children('input.mdp').attr('type','password');
				parentss.children('input.mdp').addClass('visibless');
				parentss.children('input.mdp').addClass('invisibless');
				th.children('span').removeClass('glyphicon-eye-open');
				th.children('span').addClass('glyphicon-eye-close');
			}
			
		})
	function recup_msg_administration(){
		var elementss = '';
		var id_users = localStorage.getItem('num_users');
		$.ajax({
			url:'https://www.findtagant.online/loginfo_doc/controleur/recup_message.php',
			type:'post',
			dataType:'json',
			data:'users_num='+id_users+'&statut=employe',
			success:function(data){
				$('body #nbre_msg_recu').text(data.length);
				$('body #modal_affiche_messages').modal('show');
				
				elementss = '<div class="panel panel-primary">\
								<div class="panel-heading">\
									<h4><center>Administration ID LOGISTIC</br><span style="font-size:0.7em">Message envoyé par : '+data[0]['users_num']+'</span></center></h4>\
								</div>\
								<div class="form-group panel-body table-responsive table-wrapper-scroll-y">\
									<div class="form-group" style="background-color:#bdc3c7;overflow-wrap: break-word;">\
										<center>'+data[0]['libelle']+'</center>\
									</div>\
									<form class=form-group" action ="" data-url="https://www.findtagant.online/loginfo_doc/controleur/response_users.php" method="post" id="form_send_response">\
										<div class="form-group shadow-textarea">\
											<center><label>Voulez-vous etre anonyme?</label></center>\
											<select class="form-control" name="anonymat">\
												<option value="Oui">Oui</option>\
												<option value="Non">Non</option>\
											</select>\
										</div>\
										<div class="form-group shadow-textarea">\
											<textarea class="form-control z-depth-1 textareafr" name="libelle" style="color:#008080" id="msg_diffusion" rows="6" placeholder="Ecrivez votre réponse ici..."></textarea>\
										</div>\
										<input style="display:none" name="message_referent" type="text" value="'+data[0]['num_msg']+'">\
										<input style="display:none" name="users_num" type="text" value="'+id_users+'">\
										<button type="submit" class="btn btn-info">Envoyer</button>\
									</form>\
								</div>\
							</div>';
							
				$('body #corps_affiche_messages').html(elementss);
			}
		})
		
	}
	
	
	//*********************************juste pour afficher le nombre de message a l'accueil
		if(localStorage.getItem('droit_num') == "2" || localStorage.getItem('droit_num') == "3"){
				var elementss = $('body').tagant_recup_msg_administration();
		}else if(localStorage.getItem('droit_num') == "1"){
					var elementss = $('body').tagant_recup_msg_employe();
		}
	//********************************************************************
	
	$('body').on('click','#recup_msg',function(e){
			e.preventDefault();
			if(localStorage.getItem('droit_num') == "2" || localStorage.getItem('droit_num') == "3"){
				$('body #modal_affiche_messages').modal('show');
				$('body').tagant_recup_msg_administration();
			}else if(localStorage.getItem('droit_num') == "1"){
				$('body #modal_affiche_messages').modal('show');
				$('body').tagant_recup_msg_employe();
			}
    })
	
	$('body').on('click','span.delete_heures',function(e){
		e.preventDefault();
		e.stopPropagation();
		var th = $(this);
		var nbre_jour = th.attr('name');
		var valeur = th.parent().attr('id');
        if(confirm('Voulez-vous vraiment la supprimer ?')){
			 $.ajax({
				url:'https://www.findtagant.online/loginfo_doc/controleur/delete_heures.php',
				type:'post',
				dataType:'json',
				data:'users_num='+localStorage.getItem('num_users')+'&nbre_jour='+nbre_jour+'&valeur='+valeur,
				success:function(data){
					th.parent().remove();
					$('.close').trigger('click');
				}
			})
		}
    });
	
})

 