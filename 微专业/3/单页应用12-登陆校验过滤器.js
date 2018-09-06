class AuthFilter extends Filter{
	doFileter(){
		let session = this._context.session;
		if(!session || !sessoion.user || !session.user.id){
			redirect('/login');
			return;
		}
		super.chain();
	}
}