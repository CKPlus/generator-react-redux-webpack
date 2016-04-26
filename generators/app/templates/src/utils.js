import moment from 'moment-timezone';


var Utils = function() {

	this.periodsTypeMapping = function(str) {
		let periodsType = {
			'BASIC': 1,
			'ADVANCE': 2
		}
		return periodsType[str];
	},
	
	this.validateImgLink = function(images) {
		for(var i=0, l=images.length; i<l; i+=1){
			var item = images[i];

			if( item.link_url && (item.link_url.indexOf('http') == -1) )
				return false;
			// 如果 item.link_url 是空的 app_name, app_package 必填
			if( !item.link_url && ( !item.app_name || !item.app_package))
				return false;
		}
		return true;
	}


	this.validateAPPSchema = function(images) {
		for(var i=0, l=images.length; i<l; i+=1){
			var item = images[i];
			
			if( item.app_name || item.app_package) {
				if( !item.link_url )
					return false;
			}
		}
		return true;
	}

	this.validatePeriods = function(periods)	{
		for(var i=0, l=periods.length; i<l; i+=1){
			var item = periods[i];
			if( item.start == 'Invalid date' || item.end == 'Invalid date' )
				return false;
		}
		return true;
	}

	this.validateRatio = function(images)	{
		var ratio = 0;
		for(var i=0, l=images.length; i<l; i+=1){
			var item = images[i];
			ratio += item.ratio
		}
		if(ratio != 1)
			return false;
		return true;
	}

	this.validateRequire = function(str){
		if(!str) {
			return false;
		}
		return true;
	}

	this.validateScriptOrder = function(images){
		for(var i=0, l=images.length; i<l; i+=1){
			var item = images[i];
			if(!item.order)
				return false;
		}
		return true;
	}


	this.isUniqueAdvertiserId = function(advertiserList, advertiser) {
		if(advertiserList.indexOf(advertiser) != -1) {
			return false
		}
		return true
	}

	this.validateImages = function(images){
		if(images.length < 1)
			return false;
		return true;
	}

	this.toCSTDate = function(dateObj, region) {
		var	zone = null;
		switch(region) {
			case 'TW':
				zone = 'Asia/Taipei';
				break;
			case 'HK':
				zone = 'Asia/Hong_Kong';
				break;
			case 'KR':
				zone = 'Asia/Seoul';
				break;
			case 'TH':
				zone = 'Asia/Bangkok';
				break;
			case 'BR':
				zone = 'America/Sao_Paulo';
				break;
		}


		var year = dateObj.getFullYear(),
			month = dateObj.getMonth(),
			date = dateObj.getDate(),
			hours = dateObj.getHours(),
			minutes = dateObj.getMinutes();

		var arr = [year, month, date, hours, minutes];
		var mObj = moment.tz(arr, zone);

		mObj.tz('Asia/Taipei');

		return mObj.toDate()
	},

	this.validateTotalClick = function(impression, totalClick) {
		if( impression && (impression < totalClick) )
			return false;
		else
			return true
	},

	this.validateTotalInstall = function(impression, totalClick, totalInstall) {
		if( impression && (impression < totalInstall) ) {
			return false;
		}
		else if ( totalClick && (totalClick < totalInstall)  ){
			return false;
		}
		else {
			return true;
		}

	},

	this.validateTotalUniqueUser = function(impression, totalUniqueUser) {
		if(totalUniqueUser && impression) {
			if( impression < totalUniqueUser )
				return false;
			else
				return true;
		}
		else {
			return true
		}
	},

	this.validateAppNameAndPackageName = function(images) {
		var flag = false;
		for(var i=0, l=images.length; i<l; i+=1){
			var item = images[i];
			if( item.app_name && item.app_package ) {
				flag = true;
			}
		}
		if(flag)
			return true;
		else
			return false
	},

	this.validateInstall = function(postData) {
		var install = postData.install,
			images  = postData.images;
		if(install == '1' || install == '2') {
			for(var i=0, l=images.length; i<l; i+=1){
				var item = images[i];
				if( !(item.app_name && item.app_package) ) {
					alert('Please fill app name and app package.');
					return false;
				}
			}
		}
		return true;
	}
}


module.exports = Utils;
