function approve(req) {
	let ok = false;
	let amount = req.amount;

	if (amount < 5) {
		ok = true;
		console.log('主任审批通过！');
		return;
	}
	if(5<=amount&&amount<10){
		ok = true;
		console.log('副董事长审批通过！');
		return;
	}
	if(10<=amount&&amount<50){
		ok = true;
		console.log('董事长审批通过！');
		return;
	}
	if(amount>=50){
		ok = true;
		console.log('董事会审批通过！');
		return;
	}
	if(!ok){
		console.log('无人审批此金额['+req.amount+']采购单');
	}

}