let chains = [];

function approve(req){
	let index = 0;
	let next = ()=>{
		let func = chains[index];
		index++;
		if(!!func){
			return func(req,next);
		}
	};
	return next();
}

function def(func){
	chains.push(func);
}

def((req,next)=>{
	console.log(req.amount);
	if(req.amount < 5){
		return '主任审批通过！';
	}else{
		next();
	}
});

def((req,next)=>{
	if(5 <= req.amount < 10){
		return '董事长审批通过！';
	}else{
		next();
	}
});

def((req,next)=>{
	let ok = next();
	if(!ok){
		console.error('无人审批此金额['+req.amount+']采购单');
	}
});

export {approve};
