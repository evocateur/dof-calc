// http://silverlight.co.uk/resources/dof_calc.html
// only cosmetic (spacing) changes

function doField(form) {
	if (document.form.dist[0].checked) {
		unit      = 1000;
		unit2     = 100;
		unitName  = " m";
		unitName2 = " cm";
	}
	else {
		unit      = 304.8;
		unit2     = 12;
		unitName  = " ft";
		unitName2 = " in";
	}
	D = (form.distance.value) * unit;
	c = (document.form.format.options[  document.form.format.selectedIndex  ].value);
	f = (document.form.aperture.options[document.form.aperture.selectedIndex].value);
	F = (document.form.focal.options[   document.form.focal.selectedIndex   ].value);

	if (isNaN(D) || D < 0 || document.form.distance.value == "") {
		alert('Please enter a numerical value for subject distance.');
		document.form.distance.focus();
		document.form.distance.select();
	}
	else {
		h        = (F * F) / (f * c);
		dofNear  = (h * D) / (h + (D - F));
		dofFar   = (h * D) / (h - (D - F));
		dofTotal = (dofFar - dofNear);

		hForm     = Math.floor(h        / unit);
		nearForm  = Math.floor(dofNear  / unit);
		farForm   = Math.floor(dofFar   / unit);
		totalForm = Math.floor(dofTotal / unit);

		hyperFocal2 = Math.round((h        / unit - Math.floor(h        / unit)) * unit2);
		dofNear2    = Math.round((dofNear  / unit - Math.floor(dofNear  / unit)) * unit2);
		dofFar2     = Math.round((dofFar   / unit - Math.floor(dofFar   / unit)) * unit2);
		dofTotal2   = Math.round((dofTotal / unit - Math.floor(dofTotal / unit)) * unit2);

		if (hyperFocal2 == 100 && unit == 1000 || hyperFocal2 == 12 && unit == 304.8) {
			hForm = hForm + 1;
			hyperFocal2 = 0;
		}
		if (dofNear2 == 100 && unit == 1000 || dofNear2 == 12 && unit == 304.8) {
			nearForm = nearForm + 1;
			dofNear2 = 0;
		}
		if (dofFar2 == 100 && unit == 1000 || dofFar2 == 12 && unit == 304.8) {
			farForm = farForm + 1;
			dofFar2 = 0;
		}
		if (dofTotal2 == 100 && unit == 1000 || dofTotal2 == 12 && unit == 304.8) {
			totalForm = totalForm + 1;
			dofTotal2 = 0;
		}

		form.hyperFocal.value = hForm + unitName + " " + hyperFocal2 + unitName2;
		form.dofNear.value = nearForm + unitName + " " + dofNear2    + unitName2;

		if (dofFar < 0) {
			form.dofFar.value = "Infinity.";
		} else {
			form.dofFar.value = farForm + unitName + " " + dofFar2 + unitName2;
		}

		if (dofTotal < 0) {
			form.dofTotal.value = "Infinite.";
		} else {
			if (dofTotal >= 0 && dofTotal < 10 && unit == 1000) {
				form.dofTotal.value = "< 1 cm ";
			} else if (dofTotal >= 0 && dofTotal < 25.4 && unit == 304.8) {
				form.dofTotal.value = "< 1 in ";
			} else {
				form.dofTotal.value = totalForm + unitName + " " + dofTotal2 + unitName2;
			}
		}
	}
}