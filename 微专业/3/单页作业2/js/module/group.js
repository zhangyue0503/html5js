class Group extends Module {

    build(options) {
        super.build(options);
        this._body = document.createElement('div');
        this._unode = document.createElement('p');
        this._body.appendChild(this._unode);
    }

    show(context) {
        super.show(context);
        let req = context.request;
        this._doUpdateGroup(req.restParams.uid, req.restParams.gid);
    }

    refresh(context) {
        super.refresh(context);
        let req = context.request;
        this._doUpdateGroup(req.restParams.uid, req.restParams.gid);
    }

    _doUpdateGroup(uid, gid) {
        this._unode.innerHTML = '<p>大家好，我是组'+gid+'，用户' + uid + '</p>';
    }
}