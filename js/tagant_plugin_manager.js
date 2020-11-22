 (function($){
	 // localStorage.clear();
	 $('body div#entetedrapeau #imagedudrapeau').on('load', function(){
			$('body #masquepage2').attr('style','display:none');
			$('body #afficheload').attr('style','display:none');
		});
	 if(localStorage.getItem('pays_id') == null){
		  localStorage.setItem('pays_id','drapeau_blanc');
	 }
	//*************************change de langue *******************************************************
		
		
				//******************transform image et affiche***********************
								jQuery.fn.tagant_affichedrapeau = function(){
									var urlt ='';
									$('body #masquepage2').removeAttr('style');
									$('body #afficheload').removeAttr('style');
									$('body #afficheload').html('<center><img src="images/loader.gif" height="30%" width="30%"></center>');
									if(localStorage.getItem('drapeau') == null){
										function toDataURL(url, callback) {
											var httpRequest = new XMLHttpRequest();
											httpRequest.onload = function() {
											   var fileReader = new FileReader();
												  fileReader.onloadend = function() {
													 callback(fileReader.result);
												  }
												  fileReader.readAsDataURL(httpRequest.response);
											};
											httpRequest.open('GET', url);
											httpRequest.responseType = 'blob';
											httpRequest.send();
										 }
										 if(localStorage.getItem('pays_id') == 'drapeau_blanc'){
											urlt =  'drapeaus_pays/';
										 }else{
											urlt = 'drapeaus_pays/';
										 }
										 toDataURL(urlt+'drapeau_blanc.jpg', function(dataUrl){
											 localStorage.setItem('drapeau',dataUrl);
											 $('body div#entetedrapeau #imagedudrapeau').attr('src',dataUrl);
									  })
									}else{
										$('body div#entetedrapeau #imagedudrapeau').attr('src',localStorage.getItem('drapeau'));
									}
								}
								// then call this from anywhere
								
							 //***********************************fin*******************************
	 //*************************************fin recup position*************************************
	 	
					//**********mes plugins*************************
	 
	 //************traite soumission form **********************************************************
					jQuery.fn.tagant_submit_form = function(form_soumis){
						this.on('submit',form_soumis,function(e){
							e.preventDefault();
							var dismoisichecked = true;
							var quelcase = '';
							var th= $(this);
							var url = th.data('url');
							var partss = th.serialize();
							if(form_soumis == '#form_compte'){
								var partss = th.serialize()+'&num_users='+localStorage.getItem('num_users');
							}else if(form_soumis == '#form_diffusion'){
								var partss = th.serialize()+'&num_users='+localStorage.getItem('num_users');
							}else if(form_soumis == '#form_send_response' && localStorage.getItem('reponse_à_message') != ''){
								dismoisichecked = false;
							}else if(form_soumis == '#form_enregistrement'){
								if($('body input[name=sexe]:checked').val() == undefined){
									dismoisichecked = false;
								}else if($('body input#case').prop('checked') == false){
									dismoisichecked = false;
									quelcase = 'cgu';
								}
							}
							if(dismoisichecked){
								$.ajax({
									url:url,
									type:'post',
									dataType:'json',
									data:partss,
									beforeSend:function(){
										$('body #masquepage').removeAttr('style');
										$('body #afficheload').removeAttr('style');
										$('body #afficheload').html('<center><img src="images/loader.gif" height="30%" width="30%"></center>');
									},
									success:function(data){
										$('body #afficheload').html();
										$('body #masquepage').attr('style','display:none');
										$('body #afficheload').attr('style','display:none');
										if(form_soumis =='#form_ajoutmespieces'){
											if(data != 'existant'){
												$.ajax({
															url:'vue/accueil.html',
															type:'post',
															data:'',
															success:function(datas){
																$('#contenu').html(datas);
																var page = $('#contenu div').attr('name');
															}
														})
											}else{
												if(localStorage.getItem('langue')== 'fr'){
													alert('Existe déja');
												}else{
													alert('Already exists');
												}
											}
										}else if(form_soumis =='#form_enregistrement'){
											if(data != 'existant'){
												if(data[0].nom != '' && typeof(data[0].nom) != 'undefined'){
													for(var i in data[0]){
															localStorage.setItem(i,data[0][i]);
														}
														$.ajax({
															url:'vue/accueil.html',
															type:'post',
															data:'',
															success:function(datas){
																$('#contenu').html(datas);
																var page = $('#contenu div').attr('name');
															}
														})
												}else{
													if(localStorage.getItem('langue')== 'fr'){
														alert("Verifier vos donneés entreés");
													}else{
														alert("Check your data in between");
													}
												}
											}	
											
											//*********************************juste pour afficher le nombre de message a l'accueil
										
											if(localStorage.getItem('droit_num') == "2" || localStorage.getItem('droit_num') == "3"){
														var elementss = $('body').tagant_recup_msg_administration();
											}else if(localStorage.getItem('droit_num') == "1"){
														var elementss = $('body').tagant_recup_msg_employe();
											}
										//********************************************************************
											
										}else if(form_soumis =='#form_connexion'){
											if(data != ''){
												localStorage.removeItem('pays_id');
												localStorage.removeItem('drapeau');
												for(var i in data[0]){
														localStorage.setItem(i,data[0][i]);
													}
													$('body').tagant_affichedrapeau();
													$.ajax({
														url:'vue/accueil.html',
														type:'post',
														data:'',
														success:function(datas){
															$('#contenu').html(datas);
															var page = $('#contenu div').attr('name');
														}
													})
											}else{
												if(localStorage.getItem('langue')== 'fr'){
													$('body #error_connect').text('Veuillez vérifier vos données entrées');
												}else{
													$('body #error_connect').text('Please check your entered data');
												}
											}
											
											//*********************************juste pour afficher le nombre de message a l'accueil
										
											if(localStorage.getItem('droit_num') == "2" || localStorage.getItem('droit_num') == "3"){
														var elementss = $('body').tagant_recup_msg_administration();
											}else if(localStorage.getItem('droit_num') == "1"){
														var elementss = $('body').tagant_recup_msg_employe();
											}
										//********************************************************************
											
										}else if(form_soumis == '#form_compte'){
											if(data == ''){
												alert('Ces numéros de téléphones sont déja attribués veuillez les changer ou inverser l\'ordre');
											}else{
												for(var i in data[0]){
													localStorage.setItem(i,data[0][i]);
												}
												$('body button.close').trigger('click');
											}
										}else if(form_soumis == '#form_diffusion' || form_soumis == '#form_send_response'){
											$('body button.close').trigger('click');
											if(form_soumis == '#form_send_response'){
												localStorage.setItem('reponse_à_message','message_envoyé');
											}
										}
									}
								})
							}else{
								 if(form_soumis == '#form_send_response'){
									alert('Vous avez déja repondu à ce message');
								}
							}
						})
					}
			//**************fin traitement **********************************************************
			
			//affiche form_inscription,a_propos,form_connexion******************
				jQuery.fn.tagant_affiche_infos = function(bouton,evenementss){
					this.on(evenementss,bouton,function(e){
						e.preventDefault();
						var th= $(this)
						var nom = th.attr('name');
						var url = '';
						var elementss = '';
						if(nom == 'enregistrement' || nom == 'connexion'){
							$('body #optionsaccesaccueil').attr('style','display:none');
						}else if(nom == 'commande_repas'){
							$.ajax({
								url:'https://www.findtagant.online/loginfo_doc/controleur/recup_menu.php',
								type:'post',
								dataType:'json',
								data:'',
								success:function(data){
									for(var a in data){
										if(a == 'repas'){
											var lesoptions = '<option value="">Choisissez</option>';
											var lesprix = '';
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
												lesoptions += '<option value="'+repas+'">'+repas+'</option>';
												sessionStorage.setItem(repas,prix_repas);
											}
												
											elementss += '<tr>\
																<td><p class="pull-left">Repas : </p></td>\
																<td><select class="form-control" name="liste_repas">'+lesoptions+'</select></td>\
																<td class="td_affiche_montant_repas"></td>\
															</tr>';
										}else{
											var lesoptions2 = '<option value="">Choisissez</option>';
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
												lesoptions2 += '<option>'+boissons+'</option>';
												sessionStorage.setItem(boissons,prix_boissons);
											}
											
												elementss += '<tr>\
																<td><p class="pull-left">Boissons : </p></td>\
																<td><select class="form-control" name="liste_boissons">'+lesoptions2+'</select></td>\
																<td class="td_affiche_montant_boissons"></td>\
															</tr>';
											
										}
									}
									elementss += '<tr><td>Total commande: <span id="total_cmd">0</span></td></tr>';
									$('body #corps_tableau_menu').html(elementss);
									
									if(localStorage.getItem('droit_num') == '3'){
										$('body button#voir_commandes').removeAttr('style');
										$('body button#modifier_menu').removeAttr('style');
									}
									
								}
							})
						}
						url = 'vue/'+nom+'.html';
						if(true){
								$.ajax({
									url:url,
									type:'post',
									data:'',
									success:function(data){
										$('#contenu').html(data);
										var page = $('#contenu div').attr('name');
										
										if(nom == 'message' && localStorage.getItem('droit_num') == "1"){
											$('body #diffusion').removeAttr('style');
										}
										//*********************************juste pour afficher le nombre de message a l'accueil
										
											if(localStorage.getItem('droit_num') == "2" || localStorage.getItem('droit_num') == "3"){
														var elementss = $('body').tagant_recup_msg_administration();
											}else if(localStorage.getItem('droit_num') == "1"){
														var elementss = $('body').tagant_recup_msg_employe();
											}
										//********************************************************************
									}
								})
						}
					})
				}
	 
				//************************************************
				
	jQuery.fn.tagant_sauvegarde_enregistrement = function(bouton,evenementss){
		this.on(evenementss,bouton,function(e){
			e.preventDefault();
			var th = $(this);
			if(bouton == '#form_date_enregistrement'){
				var datess = $("form"+bouton+" input[name='datess']").val();
				localStorage.setItem('date_enregistrement',datess);
				var elementss =' <button type ="submit" class="btn btn-warning">\
						<span class="glyphicon glyphicon-hand-right"></span> \
						<span class="langue annuler" name="date_enregistrement">Annuler</span>\
					</button>' ;
				$("form"+bouton+" button[type='submit']").replaceWith(elementss);
			
			}else if(bouton == '#form_heure_debut'){
				if(localStorage.getItem('date_enregistrement') != null){
					var heure_debut = $("form"+bouton+" input[name='heure_debut']").val();
					localStorage.setItem('heure_debut',heure_debut);
					var elementss =' <button type ="submit" class="btn btn-warning">\
							<span class="glyphicon glyphicon-hand-right"></span> \
							<span class="langue annuler" name="heure_debut">Annuler</span>\
						</button>' ;
					$("form"+bouton+" button[type='submit']").replaceWith(elementss);
				}else{
					alert('Veuillez d\'abord entrer une date');
					var heure_debut = $("form"+bouton+" input[name='heure_debut']").val('');
				}
			}else if(bouton == '#form_heure_fin'){
				if(localStorage.getItem('date_enregistrement') != null && localStorage.getItem('heure_debut') != null){
					var heure_fin = $("form"+bouton+" input[name='heure_fin']").val();
					localStorage.setItem('heure_fin',heure_fin);
					var elementss =' <button type ="submit" class="btn btn-warning">\
							<span class="glyphicon glyphicon-hand-right"></span> \
							<span class="langue annuler" name="heure_fin">Annuler</span>\
						</button>' ;
					$("form"+bouton+" button[type='submit']").replaceWith(elementss);
				}else{
					alert('Veuillez d\'abord entrer une date et une heure de début');
					var heure_fin = $("form"+bouton+" input[name='heure_fin']").val('');
				}
			}
		})
	}
	
	jQuery.fn.tagant_recup_msg_employe = function(){
		var elementss = '';
		var id_users = localStorage.getItem('num_users');
		$.ajax({
			url:'https://www.findtagant.online/loginfo_doc/controleur/recup_message.php',
			type:'post',
			dataType:'json',
			data:'users_num='+id_users+'&statut=administration',
			success:function(data){
				if(typeof(data) != 'string' && data.length > 0){
					for(var a in data){
						var nom_users = '';
						var message_users = '';
						for(var b in data[a]){
							if(b == 'anonymat' && data[a][b] !='Non' &&data[a][b] !='Oui'){
								nom_users = data[a][b];
							}
							if(b == 'libelle'){
								message_users = data[a][b];
							}
						}
						if(nom_users == ''){
							elementss += '<div class="panel panel-primary">\
									<div class="panel-heading">\
										<h4><center>Anonyme</center></h4>\
									</div>\
									<div class="panel-body table-responsive table-wrapper-scroll-y">\
										<p><center>'+message_users+'</center></p>\
									</div>\
								</div>';
						}else if(nom_users != ''){
							elementss += '<div class="panel panel-primary">\
									<div class="panel-heading">\
										<h4><center>'+nom_users+'</center></h4>\
									</div>\
									<div class="panel-body table-responsive table-wrapper-scroll-y">\
										<p><center>'+message_users+'</center></p>\
									</div>\
								</div>';
						}
						
						
					}
					$('body #nbre_msg_recu').text(data.length);
					$('body #corps_affiche_messages').html(elementss);
				}
				
			}
		})
	}
	
	
	jQuery.fn.tagant_recup_msg_administration = function(){
		var elementss = '';
		var id_users = localStorage.getItem('num_users');
		$.ajax({
			url:'https://www.findtagant.online/loginfo_doc/controleur/recup_message.php',
			type:'post',
			dataType:'json',
			data:'users_num='+id_users+'&statut=employe',
			success:function(data){
				// $('body #modal_affiche_messages').modal('show');
				if(typeof(data) != 'string' && data.length > 0){
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
							
						//***********************elements pour verifier si le messag a deja ete envoyé********************
							if(localStorage.getItem('texte_message') == null){
								localStorage.setItem('texte_message',data[0]['libelle']);
								localStorage.setItem('reponse_à_message','');
							}
							if(data[0]['libelle'] != localStorage.getItem('texte_message')){
								localStorage.setItem('texte_message',data[0]['libelle']);
								localStorage.setItem('reponse_à_message','');
							}
				//***************************************************************************
					$('body #nbre_msg_recu').text(data.length);
					$('body #corps_affiche_messages').html(elementss);
				}
				
			}
		})
		
	}
	
})(jQuery)