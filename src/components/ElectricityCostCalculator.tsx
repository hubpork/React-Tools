import React, { useEffect, useState } from 'react';
import "./styles.css";

const ElectricityCostCalculator: React.FC = () => {
  const [annualConsumption, setAnnualConsumption] = useState<number>(0);
  const [quantityHighRate, setQuantityHighRate] = useState<number>(0);
  const [quantityLowRate, setQuantityLowRate] = useState<number>(0);


  ///// Actual Year
  const actualYear = 2023;
  const gridUsageLowRateActualYear = 4.80 / 100;
  const energyUsageLowRateActualYear = 6.10 / 100;
  
  const gridUsageHighRateActualYear = 5.30 / 100;
  const energyUsageHighRateActualYear = 6.60 / 100;
  
  const municipalTaxActualYear = 0.95 / 100;
  const federalFeeActualYear = 2.30 / 100;
  const systemServiceActualYear = 0.46 / 100;
  const powerReserveActualYear = 0.00;
  const taxActualYear = 7.70;

  ///// Next Year
  const nextYear = 2024;
  const gridUsageLowRateNextYear = 7.00 / 100;
  const energyUsageLowRateNextYear = 24.30 / 100;
  
  const gridUsageHighRateNextYear = 7.70 / 100;
  const energyUsageHighRateNextYear = 26.30 / 100;

  const municipalTaxNextYear = 0.95 / 100;
  const federalFeeNextYear = 2.30 / 100;
  const systemServiceNextYear = 0.75 / 100;
  const powerReserveNextYear = 1.20 / 100;
  const taxNextYear = 8.10;

  // Helper function to format a number with a specific decimal precision
  const formatNumber = (number: number): string => {
    // Round the number to the nearest multiple of 0.05
    const roundedNumber = Math.round(number / 0.05) * 0.05;
    // Format the rounded number with the specified decimal precision
    return new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(roundedNumber);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {valueAsNumber} = e.target;
    setAnnualConsumption(valueAsNumber);

    // Update the other inputs based on the new annualConsumption value
    setQuantityHighRate((valueAsNumber) * 0.4);
    setQuantityLowRate((valueAsNumber) * 0.6);
  };

  useEffect(() => {
    setAnnualConsumption(quantityHighRate + quantityLowRate)
  }, [quantityHighRate, quantityLowRate])

  const handleQuantityHighRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityHighRate = !e.target.value ? 0 : parseFloat(e.target.value);
    setQuantityHighRate(newQuantityHighRate);
  };
  
  const handleQuantityLowRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityLowRate = !e.target.value ? 0 : parseFloat(e.target.value);
    setQuantityLowRate(newQuantityLowRate);
  };

  
  const gridUsageSubtotal = (year: number): number => {
    const gridUsageLowRate = year === 0 ? gridUsageLowRateActualYear : gridUsageLowRateNextYear;
    const gridUsageHighRate = year === 0 ? gridUsageHighRateActualYear : gridUsageHighRateNextYear;

    const gridUsageLowRateSubtotal = quantityLowRate * gridUsageLowRate;
    const gridUsageHighRateSubtotal = quantityHighRate * gridUsageHighRate;

    return gridUsageLowRateSubtotal + gridUsageHighRateSubtotal;
  };


  const energyUsageSubtotal = (year: number): number => {
    const energyUsageLowRate = year === 0 ? energyUsageLowRateActualYear : energyUsageLowRateNextYear;
    const energyUsageHighRate = year === 0 ? energyUsageHighRateActualYear : energyUsageHighRateNextYear;

    const energyUsageLowRateSubtotal = quantityLowRate * energyUsageLowRate;
    const energyUsageHighRateSubtotal = quantityHighRate * energyUsageHighRate;

    return energyUsageLowRateSubtotal + energyUsageHighRateSubtotal;
  };

  const calculateSubtotal = (year: number): number => {
    const gridUsageLowRate = year === 0 ? gridUsageLowRateActualYear : gridUsageLowRateNextYear;
    const gridUsageHighRate = year === 0 ? gridUsageHighRateActualYear : gridUsageHighRateNextYear;
    const energyUsageLowRate = year === 0 ? energyUsageLowRateActualYear : energyUsageLowRateNextYear;
    const energyUsageHighRate = year === 0 ? energyUsageHighRateActualYear : energyUsageHighRateNextYear;

    const gridUsageLowRateSubtotal = quantityLowRate * gridUsageLowRate;
    const gridUsageHighRateSubtotal = quantityHighRate * gridUsageHighRate;
    const energyUsageLowRateSubtotal = quantityLowRate * energyUsageLowRate;
    const energyUsageHighRateSubtotal = quantityHighRate * energyUsageHighRate;

    return gridUsageLowRateSubtotal + gridUsageHighRateSubtotal + energyUsageLowRateSubtotal + energyUsageHighRateSubtotal;
  };

  const municipalTaxSubtotal = (year: number): number => {
    const municipalTaxLowRate = year === 0 ? municipalTaxActualYear : municipalTaxNextYear;
    const municipalTaxHighRate = year === 0 ? municipalTaxActualYear : municipalTaxNextYear;

    const municipalTaxLowRateSubtotal = quantityLowRate * municipalTaxLowRate;
    const municipalTaxHighRateSubtotal = quantityHighRate * municipalTaxHighRate;

    return municipalTaxLowRateSubtotal + municipalTaxHighRateSubtotal;
  };

  const federalFeeSubtotal = (year: number): number => {
    const federalFeeLowRate = year === 0 ? federalFeeActualYear : federalFeeNextYear;
    const federalFeeHighRate = year === 0 ? federalFeeActualYear : federalFeeNextYear;

    const federalFeeLowRateSubtotal = quantityLowRate * federalFeeLowRate;
    const federalFeeHighRateSubtotal = quantityHighRate * federalFeeHighRate;

    return federalFeeLowRateSubtotal + federalFeeHighRateSubtotal;
  };

  const systemServiceSubtotal = (year: number): number => {
    const systemServiceLowRate = year === 0 ? systemServiceActualYear : systemServiceNextYear;
    const systemServiceHighRate = year === 0 ? systemServiceActualYear : systemServiceNextYear;

    const systemServiceLowRateSubtotal = quantityLowRate * systemServiceLowRate;
    const systemServiceHighRateSubtotal = quantityHighRate * systemServiceHighRate;

    return systemServiceLowRateSubtotal + systemServiceHighRateSubtotal;
  };


  const powerReserveSubtotal = (year: number): number => {
    const powerReserveLowRate = year === 0 ? powerReserveActualYear : powerReserveNextYear;
    const powerReserveHighRate = year === 0 ? powerReserveActualYear : powerReserveNextYear;

    const powerReserveLowRateSubtotal = quantityLowRate * powerReserveLowRate;
    const powerReserveHighRateSubtotal = quantityHighRate * powerReserveHighRate;

    return powerReserveLowRateSubtotal + powerReserveHighRateSubtotal;
  };

  const calculateSubtotalCharges = (year: number): number => {
    const municipalTaxCharges = municipalTaxSubtotal(year);
    const federalFeeCharges = federalFeeSubtotal(year);
    const systemServiceCharges = systemServiceSubtotal(year);
    const powerReserveCharges = powerReserveSubtotal(year);
    
    return  municipalTaxCharges + federalFeeCharges + systemServiceCharges + powerReserveCharges;

  };

  const calculateTotal = (year: number): number => {
    const subtotal = calculateSubtotal(year);
    const subtotalCharges = calculateSubtotalCharges(year);

    return subtotal + subtotalCharges;
  };


  const calculateTaxSubtotal = (year: number): number => {
    const calculateTax = year === 0 ? taxActualYear : taxNextYear;
    return calculateTotal(year) * calculateTax / 100;
  };


  const calculateFinalPricePerYear = (year: number): number => {
    const total = calculateTotal(year);
    const taxPercent = calculateTaxSubtotal(year);
    return total + taxPercent;
  };

  return (
    <div className='container ecc'>

      <label className="d-flex gap-2 justify-content-between align-items-center flex-wrap">
        <div>Annual consumption <small>in kWh</small></div>
        {
          annualConsumption === 0 ? (
            <input
            type="number"
            onChange={handleInputChange}
          />
          ) : (
            <input
            type="number"
            value={annualConsumption}
            onChange={handleInputChange}
          />
          )
        }
      </label>
      <label className="d-flex gap-2 justify-content-between align-items-center flex-wrap">
        <div>Quantity high rate (HT) <small>in kWh [Monday to Friday, 7:00 a.m. - 7:00 p.m.]</small></div>
        {
          quantityHighRate === 0 ? (
            <input
            type="number"
            onChange={handleQuantityHighRateChange}
          />
          ) : (
            <input
            type="number"
            value={quantityHighRate}
            onChange={handleQuantityHighRateChange}
          />
          )
        }
      </label>
      <label className="d-flex gap-2 justify-content-between align-items-center flex-wrap">
        <div>Quantity low rate (NT) <small>in kWh [other time]</small></div>
        {
          quantityLowRate === 0 ? (
            <input
            type="number"
            onChange={handleQuantityLowRateChange}
          />
          ) : (
            <input
            type="number"
            value={quantityLowRate}
            onChange={handleQuantityLowRateChange}
          />
          )
        }
      </label>

      <br />

      <div className='d-flex flex-column'>
        <div className='d-flex gap-2 justify-content-end my-2'>
          <h2>Annual cost calculation</h2>
        </div>
        <div className='grid'>
          <div></div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <strong>{actualYear}</strong>
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <strong>{nextYear}</strong>
          </div>
        </div>
        <div className='grid'>
          <div></div>
          <h3>Tariff</h3>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <h3>CHF</h3>
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <h3>CHF</h3>
          </div>
        </div>
        <div className='grid'>
          <div>Grid usage</div>
          <div>General N</div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(gridUsageSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(gridUsageSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Energie</div>
          <div>General N, Basic supply</div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(energyUsageSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(energyUsageSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Total excl. taxes and VAT</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateSubtotal(1))}
          </div>
        </div>
        <div className='hr'><hr /></div>
        <div className='grid'>
          <div>Municipal fee <small>(Concession fee)</small></div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(municipalTaxSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(municipalTaxSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Federal tax</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(federalFeeSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(federalFeeSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Swissgrid - System service</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(systemServiceSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(systemServiceSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Swissgrid - Power reserve</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(powerReserveSubtotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(powerReserveSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Total charges</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateSubtotalCharges(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateSubtotalCharges(1))}
          </div>
        </div>
        <div className='hr'><hr /></div>
        <div className='grid'>
          <div>Total excl. VAT</div>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateTotal(0))}
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateTotal(1))}
          </div>
        </div>
        <div className='grid'>
          <div>Added value tax</div>
          <div>{formatNumber(taxActualYear)}% / {formatNumber(taxNextYear)}%</div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateTaxSubtotal(0))}
            
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            {formatNumber(calculateTaxSubtotal(1))}
          </div>
        </div>
        <div className='grid'>
          <h3>Total incl. VAT</h3>
          <div></div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <h3>{formatNumber(calculateFinalPricePerYear(0))}</h3>
          </div>
          <div className='d-flex gap-2 justify-content-end align-items-center'>
            <h3>{formatNumber(calculateFinalPricePerYear(1))}</h3>
          </div>
        </div>
        <div className='hr'><hr className="end" /></div>
      </div>
      {/* <br />
      <div className="d-flex gap-2 justify-content-end my-2"><button onClick={() => window.print()}>Print</button></div> */}
    </div>
  );
};

export default ElectricityCostCalculator;
