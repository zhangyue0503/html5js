class AuthFilter extends Filter {
    doFilter() {
        let session = this._context.session;
        if (!session || !session.user || !session.user.id) {
            // redirect('/login');
            // return;
            console.log('登录不通过');
        }
        super.chain();
    }
}