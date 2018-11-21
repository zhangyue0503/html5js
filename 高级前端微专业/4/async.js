export default {
	getUser:(callback)=>{
		jQuery.ajax({
			url:'',
			success:callback
		});
	},
	getUserByPost:(callback)=>{
		jQuery.post('',callback);
	},
	getUserAsync:async ()=>{
		return jQuery.ajax({
			url:'',
			success:data=>{
				return data;
			}
		});
	}
}