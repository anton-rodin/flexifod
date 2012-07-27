$.fn.Model = {
	name: "",
	prop: {},
	items: {},
	oldest: Infinity,
	init: function(obj){
		var instence = {};
		instence.prop = $.extend({}, obj);
		instence.__proto__ = this;
		if (obj.id) {
			this.items[instence.prop.id] = instence;
			if (this.oldest > instence.prop.adddate)
				this.oldest = instence.prop.adddate;

		}
		return instence;
	},
	update: function(data, callback){
		var self = this,
			success = function(data) {
				if (data && data.status && data.status == "success") callback(self, true);
					//toastr.success("Данные сохранены");
				else callback(self, false);
					//toastr.error('Сохранить данные не получилось, попробуйте ещё раз');
			}, 
			error = function(data) {
				callback(self, false);
				//toastr.error('Сохранить данные не получилось, попробуйте ещё раз!');
			};
		$.extend(this.prop, data);
		$.ajax({
			url: "/api/"+this.name+"/"+this.prop.id,
			type: "PUT",
			data: this.prop,
			success: success,
			error: error
		});
	},
	create: function(data, callback){
		var instence = this.init(data),
			self = this,
			success = function(data) {
				if (data && data.status && data.status == "success") {
					$.extend(instence.prop, data.item);
					self.items[instence.prop.id] = instence;
					if (self.oldest > instence.prop.adddate)
						self.oldest = instence.prop.adddate;
					callback(instence, true);
				}
				else callback(instence, false);
			}, 
			error = function(data) {
				callback(instence, false);
			};
		if (instence) {	
			$.ajax({
				url: "/api/"+this.name+"/create",
				type: "POST",
				data: instence.prop,
				success: success,
				error: error
			});
		} else {
			callback(null, false);
		}
	},
	destroy: function(callback) {
		var success, error, self = this;
		if (this.prop && this.prop.id){
			success = function(data) {
				if (data && data.status && data.status == "success") {
					delete self.items[self.prop.id];
					callback(self, true);
				}
				else callback(self, false);
			};
			error = function(data) {
				callback(self, false);
			};
			$.ajax({
				url: "/api/"+this.name+"/"+this.prop.id,
				type: "DELETE",
				data: this.prop,
				success: success,
				error: error
			});
		} else {
			callback(this, false);
		}
	}
}

$(function(){
	var Bookmark = $.fn.Bookmark = {},
		re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	Bookmark.__proto__ = $.fn.Model;
	Bookmark.name = "bookmark";
	Bookmark.init = function(obj) {
		re.lastIndex = 0;
		if (re.test(obj.url) && obj.title!='' && obj.description !=''){
			if (obj.changedate)
				obj.changedate = new Date(Number(obj.changedate));
			if (obj.adddate)
				obj.adddate = new Date(Number(obj.adddate));
			return this.__proto__.init.call(Bookmark, obj);
		}
		else 
			return null;	
	}


});