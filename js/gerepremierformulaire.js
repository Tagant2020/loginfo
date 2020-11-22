$(function(){
	document.addEventListener('deviceready',myDeviceReady(),false);
	// var pictureSource;   // picture source
	// var destinationType; // sets the format of returned value
	function myDeviceReady(){
			 document.addEventListener("backbutton",onBackKeyDown,false);
			 $('body').tagant_affichedrapeau();
			 // $('body').tagant_affichenotification();
			 $('body').on('click','.parametre',function(e){
				   e.preventDefault();
				   var th = $(this);
				   var nom = th.attr('name');
				   var nom_users = localStorage.getItem('nom');
				   if(nom == 'compte' && nom_users != undefined){
					   $('body #modalcompte').modal('show');
					   $('#afficheparametre').attr('style','display:none');
					   $('body #form_compte input,#form_compte select').each(function(){
							var th2 = $(this);
							var nom2 = th2.attr('name');
							if(nom2 =='nom'){
								th2.val(localStorage.getItem('nom'));
							}else if(nom2 =='prenom'){
								th2.val(localStorage.getItem('prenom'));
							}else if(nom2 =='periode'){
								th2.val(localStorage.getItem('periode'));
							}else if(nom2 =='zone'){
								th2.val(localStorage.getItem('zone'));
							}
					   });
				   }else if(nom == 'deconnexion' && nom_users != undefined){
					   $('#afficheparametre').attr('style','display:none');
					   $.ajax({
							url:'vue/optionaccueil.html',
							type:'post',
							data:'',
							success:function(data){
								$('body #contenu').html(data); 
								page = $('#contenu div').attr('name');
								// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
								var langue = localStorage.getItem('langue');
								localStorage.clear();
								localStorage.setItem('langue',langue);
							}
						})
				   }else if(nom == 'desinscription' && nom_users != undefined){
					   $('#afficheparametre').attr('style','display:none');
					   if(localStorage.getItem('langue')== 'fr'){
							 cordova.plugins.email.open({
								to:      'boreltagant@gmail.com',
								subject: 'Désinscription',
								body:    'Je veux me désinscrire'
							});
						}else{
							 cordova.plugins.email.open({
								to:      'boreltagant@gmail.com',
								subject: 'Unsubscribe',
								body:    'I want to unsubscribe'
							});
						}
					    cordova.plugins.email.open({
							to:      'boreltagant@gmail.com',
							subject: 'Désinscription',
							body:    'Je veux me désinscrire'
						});
				   }else if(nom == 'mon_acces'  && nom_users != undefined){
						$('body #affiche_mon_acces').modal('show');
						$('#afficheparametre').attr('style','display:none');
						var elementss= '';
						$.ajax({
							url:'controleur/recup_msg.php',
							type:'post',
							dataType:'json',
							data:'',
							success:function(dataw){
								for(var i in dataw){
									var message = '';
									var titre = '';
									var anonyme = '';
									for(var j in dataw[i]){
										if(j == 'users_num'){
											titre = dataw[i][j].toUpperCase();
										}else if(j == 'anonymat'){
											anonyme = dataw[i][j];
										}else if(j == 'libelle'){
											message = dataw[i][j];
										}
									}
									if(message != ''){
										elementss += '<div class="alert alert-info" style="color:bolt;word-wrap:wrap">\
														<h4><center>'+((anonyme != 'o')? titre : 'Anonyme')+'</center></h4><br>\
														<center>'+message+'</center>\
													</div> ';
									}
									
								}
								$('body #corps_affiche_mon_acces').html(elementss); 
							}
						})
						
				   }else if(nom_users == undefined){
						if(localStorage.getItem('langue')== 'fr'){
							alert('Veuillez vous inscrire pour y avoir accès');
						}else{
							alert('Please register to get access');
						}
				   }
				});
			// pictureSource=navigator.camera.PictureSourceType;
			// destinationType=navigator.camera.DestinationType;

			 // navigator.globalization.getPreferredLanguage(
				// function(language){
					// if(localStorage.getItem('langue')!= null){
						// $('body select#languess').val(localStorage.getItem('langue'));
					// }else{
						// if(language.value == 'fr-FR'){
						// localStorage.setItem('langue','fr');
						 // $('body select#languess').val('fr');
					// }else{
						// localStorage.setItem('langue','en');
						// $('body select#languess').val('en');
					// }
				// }
			// },
			// function(){alert('Error getting language\n');}
		// );
		
		// function checkConnection(){
			// var networkState = navigator.connection.type;
			// var states = {};
			// states[Connection.UNKNOWN]  = 'Unknown connection';
			// states[Connection.ETHERNET] = 'Ethernet connection';
			// states[Connection.WIFI]     = 'WiFi connection';
			// states[Connection.CELL_2G]  = 'Cell 2G connection';
			// states[Connection.CELL_3G]  = 'Cell 3G connection';
			// states[Connection.CELL_4G]  = 'Cell 4G connection';
			// states[Connection.CELL]     = 'Cell generic connection';
			// states[Connection.NONE]     = 'No network connection';

			// return states[networkState];
		// }

		// var connection = checkConnection();
		// if(connection != 'No network connection'){
			// locationpos();
		// }else{
			// $.ajax({
				// url:'vue/error_internet.html',
				// type:'post',
				// data:'',
				// success:function(data){
					// $('#contenu').html(data);
					// $('body div#entetedrapeau #imagedudrapeau').attr('src','drapeaus_pays/drapeau_blanc.jpg');
					// var page = $('#contenu div').attr('name');
					// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
				// }
			// })
		// }
		  contientout();
	}
		
	 function onBackKeyDown(){
		var page = $('#contenu div').attr('name');
				if(page == 'accueil' || page == 'optionaccueil' || page == 'error_internet' || page == '' || page == undefined){
					if(localStorage.getItem('langue')== 'fr'){
						if(confirm('Voulez-vous sortir de l\'application')){
							navigator.app.exitApp();
						}
					}else{
						if(confirm('Do you want to exit the application')){
							navigator.app.exitApp();
						}
					}
				}else if(page == 'connexion' || page == 'enregistrement'){
					$.ajax({
						url:'vue/optionaccueil.html',
						type:'post',
						data:'',
						success:function(data){
							$('body #contenu').html(data); 
							 page = $('#contenu div').attr('name');
							// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
						}
					})
				}else{
					$.ajax({
						url:'vue/accueil.html',
						type:'post',
						data:'',
						success:function(data){
							$('#contenu').html(data);
							 page = $('#contenu div').attr('name');
							// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
						}
					})
				}
	}
	
	$('body').on('click','#appareil_photo2',function(e){
        capturePhoto();
		$('#appareil_photo').attr('src','images/galerie.jpg');
		$('#appareil_photo').attr('height','15%');
		$('#appareil_photo').attr('width','15%');
    });
	function capturePhoto(){
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess,onFail,{quality:50,destinationType:destinationType.FILE_URI,pictureSource:pictureSource,correctOrientation:true});
	}
	 function onPhotoDataSuccess(imageURI){
		 var output_format = 'jpeg';
		var qualityy =80;
		 // var im = 'data:image/jpeg;base64,'+imageData;
		 var fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
		 sessionStorage.setItem('nomimageajoutpieceperdu',fileName);
		 		 
		$('#appareil_photo2').attr('src',imageURI);
		$('#appareil_photo2').attr('height','25%');
		$('#appareil_photo2').attr('width','50%');
		
		sessionStorage.setItem('valeurimageajoutpieceperdu',imageURI);
		
		sessionStorage.setItem('videoaulieurimage','false');
		sessionStorage.setItem('quality',qualityy);
		sessionStorage.setItem('output_format',output_format);
		sessionStorage.setItem('typephotopris','camera');
    }
	 function onFail(message) {
      alert('Failed because:'+message);
    }
	function contientout(){
		// function success_request(position){
			// handleResults = function(results,status){
				// var ville = false;
				// var pays = false;
				// main : for(var i in results[0]){
					// if(i ==='address_components'){
						// for(var j=0,m=results[0][i].length;j<m;j++){
							// var qui_est_tu = results[0][i][j].long_name;
							// for(var a=0,b=results[0][i][j].types.length;a<b;a++){
								// if(results[0][i][j].types[a] ==='country'){
									// pays = qui_est_tu;
								// else if(results[0][i][j].types[a] =='locality'){
									// ville = qui_est_tu;
									// }
								// }
							// }
							// break main;
						// }
					// }
					// localStorage.setItem('pays',pays);
					// alert(pays);
							
				// }
				// var geocoder = new google.maps.Geocoder();
				// geocoder.geocode({
					// location : new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
				// },handleResults);
			// }
		// }
			// function erreur_request(){
				// alert('aucun pays');
			// }
			// if(navigator.geolocation){
				// navigator.geolocation.getCurrentPosition(success_request,erreur_request,{maximumAge:30000,enableHighAccuracy:true});
			// }
		if(localStorage.getItem('nom') !=null){
			$.ajax({
				url:'vue/accueil.html',
				type:'post',
				data:'',
				success:function(data){
					$('#contenu').html(data);
					var page = $('#contenu div').attr('name');
					// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
				}
			})
		}else{
			$.ajax({
				url:'vue/optionaccueil.html',
				type:'post',
				data:'',
				success:function(data){
					$('body #contenu').html(data);
					var page = $('#contenu div').attr('name');
					// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
				}
			})
		}
	}
	
	function onRequestSuccess(success){
		contientout();
	}

	function onRequestFailure(error){
		console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
		if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
			if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
				cordova.plugins.diagnostic.switchToLocationSettings();
			}
		}
	}
	
	
	function locationpos(){
		cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
	}
 })

