let chains = [];

function approve(req){
	let index = 0;
	let next = ()=>{
		let func = chains[index];
		index++;
		if(!func){
			return func(req,next);
		}
	};
	next();
}

function def(func){
	chains.push(func);
}

zhuren((req,next)=>{
	if(req.amount < 5){
		console.log('主任审批通过！')
		return true;
	}else{
		next();
	}
});

dongshizhang((req,next)=>{
	if(5 <= req.amount < 10){
		console.log('董事长审批通过！')
		return true;
	}else{
		next();
	}
});

dongshizhang((req,next)=>{
	let ok = next();
	if(!ok){
		console.error('无人审批此金额['+req.amount+']采购单');
	}
});
