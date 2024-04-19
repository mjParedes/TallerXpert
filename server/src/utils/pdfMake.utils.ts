export const fontsPdf = {
	Roboto: {
		normal: 'public/fonts/poppins/Poppins.ttf',
		bold: 'public/fonts/poppins/Poppins-Bold.ttf',
	},
}

// definimos el tamaño de fuente
export const font_size = 7

// definimos el tamaño de hoja
export const page_size = 'A4'

export const status_docum: any = {
	APROBADO: '#0071BC',
	PENDIENTE: '#FF6C2C',
	RECHAZADO: '#B30B00',
	ANULADO: '#FF0000',
}

export function slice_direccion(direccion: string) {
	const max_length = 40

	let split_index = max_length
	if (direccion.length > max_length) {
		split_index = direccion.lastIndexOf(' ', max_length)
		if (split_index === -1) {
			split_index = max_length // Si no hay espacio antes de la posición 40, dividir en el índice 40
		}
	}

	const primera_parte = direccion.slice(0, split_index)
	const segunda_parte = direccion.slice(split_index + 1, direccion.length)

	return {
		primera_parte,
		segunda_parte,
	}
}

export const mod_Fecha = (fechaOriginal: any) => {
	// Fecha en formato original
	// Crear un objeto Date con la fecha original
	const fecha = new Date(fechaOriginal)

	// Obtener día, mes y año
	const dia = fecha.getDate()
	const mes = fecha.getMonth() + 1 // Los meses en JavaScript son indexados desde 0
	const ano = fecha.getFullYear()

	// Formatear la fecha como "dd-mm-yyyy"
	const fechaFormateada = dia + '-' + (mes < 10 ? '0' : '') + mes + '-' + ano

	return fechaFormateada
}

// funcion para crear el pdf
export const pdfCreate = async (data: any) => {
	try {
		const table = {
			headerRows: 1, // esto es para que se repita la cabecera
			// auto: es de acuerdo al ancho original, //* es para ocupe lo restante
			widths: [
				'auto',
				'auto',
				50,
				'*',
				'auto',
				60,
				'auto',
				'auto',
				'auto',
				'auto',
			],
			body: [
				[
					{
						text: 'ITEM',
						style: 'tableHeader',
					},
					{
						text: 'MOTIVO',
						style: 'tableHeader',
					},
					{
						text: 'CÓDIGO',
						style: 'tableHeader',
					},
					{
						text: 'DESCRIPCIÓN',
						style: 'tableHeader',
					},
					{
						text: 'MARCA',
						style: 'tableHeader',
					},
					{
						text: 'MODELO',
						style: 'tableHeader',
					},
					{
						text: 'CONSUMIDOR',
						style: 'tableHeader',
					},
					{
						text: 'U.M.',
						style: 'tableHeader',
					},
					{
						text: 'CANT.',
						style: 'tableHeader',
					},
					{
						text: 'EMPLEADO',
						style: 'tableHeader',
					},
				],
				// data detalle y sus valores
				...data.detalle.map((item: any) => {
					return [
						{
							text: item.position,
							style: 'tableBody',
						},
						{
							text: item.motivo.toUpperCase(),
							style: 'tableBody',
						},
						{
							text: item.c65_producto.codigo,
							style: 'tableBody',
						},
						{
							text: item.descripcion,
							style: 'tableBody',
							alignment: 'left',
						},
						{
							text: item.c65_producto.c25_marca.descripcion
								? item.c65_producto.c25_marca.descripcion
								: '',
							style: 'tableBody',
							alignment: 'center',
						},
						{
							text: item.c65_producto.c25_modelo.descripcion
								? item.c65_producto.c25_modelo.descripcion
								: '',
							style: 'tableBody',
							alignment: 'center',
						},
						{
							text: item.c65_centro_costo.codigo,
							style: 'tableBody',
						},
						{
							text: item.c65_unidad_medida.codigo,
							style: 'tableBody',
						},
						{
							text: item.cantidad_solicitado,
							style: 'tableBody',
						},
						{
							text: item.c65_empleado.short_name,
							style: 'tableBody',
						},
					]
				}),
			],
		}

		return {
			pageSize: page_size,
			header: {
				margin: [25, 20, 25, 0],
				fontSize: font_size,
				columns: [
					{
						text: [
							{
								text: data.estado_aprobacion.toUpperCase(),
								color: status_docum[data.estado_aprobacion.toUpperCase()],
								bold: true,
								fontSize: font_size + 1,
							},
							{
								text: `\n${data.contribuyente.razon_social.toUpperCase()}`,
							},
							{
								text: `\nRUC: ${data.contribuyente.ruc.toUpperCase()}`,
							},
							{
								text: `\n${
									slice_direccion(data.contribuyente.direccion).primera_parte
								}\n${
									data.contribuyente.direccion.length > 40
										? slice_direccion(data.contribuyente.direccion)
												.segunda_parte
										: ''
								}`,
							},
							{
								text: [
									{
										text: '\nFECHA ',
										style: 'subheader',
									},
									{
										text: ' '.repeat(28),
										style: 'subheader',
									},
									{
										text: `: ${mod_Fecha(data.fecha)}`,
										style: 'text',
										bold: false,
									},
									{
										text: '\nTIPO DE CAMBIO:',
										style: 'subheader',
									},
									{
										text: ' '.repeat(5),
										style: 'subheader',
									},
									{
										text: `: ${data.tipo_cambio}\n`,
										style: 'text',
										bold: false,
									},
									{
										text: '\n\nDetalles:',
										style: 'subheader',
									},
								],
							},
						],
						alignment: 'left',
						margin: [0, 0, 0, 0],
					},
					{
						text: [
							{
								text: '\nPRIORIDAD',
								style: 'subheader',
							},
							{
								text: ' '.repeat(5),
								style: 'subheader',
							},
							{
								text: `: ${data.prioridad.toUpperCase()}`,
								style: 'text',
							},
						],
						alignment: 'left',
						margin: [20, 40, 0, 0],
					},
					{
						text: [
							{
								text: `REQUERIMIENTO DE CONSUMO\nN° ${data.serie} - ${data.numero}`,
								style: 'subheader',
								alignment: 'center',
							},
							// {
							//   text: [

							//   ],
							//   alignment: "left",
							// },
						],
						fontSize: font_size + 2,
					},
				],
			},
			// pie de pagina
			footer: (currentPage: any, pageCount: any, pageSize: any) => {
				return {
					margin: [40, 20, 40, 20],
					fontSize: font_size,
					columns: [
						{},
						{
							text: [
								{
									color: '#7f7f7f',
									text: 'Page | ',
								},
								{
									text: currentPage,
								},
							],
							alignment: 'right',
							width: 'auto',
						},
					],
				}
			},
			content: [
				{
					// propiedades de las lineas de la tabla
					layout: {
						hLineWidth: function (i: any, node: any) {
							if (i === 0) {
								return 0
							}
							return 1
						},
						vLineWidth: function (i: any) {
							return 0
						},
						hLineColor: function (i: any, node: any) {
							return i === 1 ||
								i === node.table.body.length - 1 ||
								i === node.table.body.length
								? 'black'
								: 'white'
						},
						paddingLeft: function (i: any) {
							return i === 0 ? 0 : 1
						},
						paddingRight: function (i: any, node: any) {
							return i === node.table.widths.length - 1 ? 0 : 5
						},
					},
					fontSize: font_size,
					table,
				},
				{
					columns: [
						{
							text: 'Departamento\nAnexo\nUsuario',
							style: 'subheader',
						},
						{
							text: `: ${data.c65_departamento.descripcion}\n: ${
								data.c65_anexo.descripcion
							}\n: ${
								data.c65_usuario.username_short
									? data.c65_usuario.username_short
									: ''
							}`,
							style: 'text',
						},
						{
							text: 'Aprobado por\nFecha',
							style: 'subheader',
						},
						{
							text: `: ${
								data.c65_aprobador.c31_usuario.username_short
									? data.c65_aprobador.c31_usuario.username_short
									: ''
							}\n: ${
								data.estado_aprobacion.toUpperCase() === 'APROBADO'
									? data.c65_aprobador.fecha_aprobacion
									: ''
							}`,
							style: 'text',
						},
						{
							text: '\nDesarrollado por NEWID SAC',
							fontSize: font_size,
							margin: [0, -5, -20, 0],
						},
					],
					margin: [0, 5, 0, 0],
				},
				{
					text: 'Observaciones      :',
					style: 'subheader',
					bold: true,
					margin: [0, 5, 0, 0],
				},
				{
					text: `${data.observacion ? data.observacion : ''}`,
					bold: false,
					style: 'text',
					margin: [0, 5, 0, 0],
				},
			],
			styles: {
				header: {
					fontSize: font_size + 4,
					bold: true,
					alignment: 'left',
				},
				subheader: {
					fontSize: font_size,
					margin: [0, 0, 0, 0],
					bold: true,
				},
				text: {
					alignment: 'left',
					fontSize: font_size,
					margin: [-45, 0, 0, 0],
				},
				tableHeader: {
					alignment: 'center',
					bold: true,
					fontSize: font_size,
					margin: [0, 0],
				},
				tableBody: {
					alignment: 'center',
					fontSize: font_size,
					margin: [0, 2.5],
				},
			},
			pageMargins: [25, 110, 25, 50],
		}
	} catch (error) {
		console.log(`${error}`)
		throw error
	}
}
