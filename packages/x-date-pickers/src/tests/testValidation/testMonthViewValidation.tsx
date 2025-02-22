import { expect } from 'chai';
import * as React from 'react';
import { screen } from '@mui/monorepo/test/utils';
import TextField from '@mui/material/TextField';
import { adapterToUse } from 'test/utils/pickers-utils';

function testMonthViewValidation(ElementToTest, propsToTest, getOptions) {
  if (!getOptions().views.includes('month')) {
    return;
  }
  describe('validation in month view:', () => {
    const defaultProps = {
      onChange: () => {},
      renderInput: (params) => <TextField {...params} />,
      open: true,
      views: ['month'],
      view: 'month',
      openTo: 'month',
      reduceAnimations: true,
      showToolbar: false,
    };

    if (propsToTest.includes('shouldDisableMonth')) {
      it('should apply shouldDisableMonth', function test() {
        const { render } = getOptions();

        render(
          <ElementToTest
            {...defaultProps}
            value={null}
            shouldDisableMonth={(date) => adapterToUse.getMonth(date) === 3}
          />,
        );

        expect(screen.getByText('Apr').getAttribute('disabled')).not.to.equal(null);
        expect(screen.getByText('Jan').getAttribute('disabled')).to.equal(null);
        expect(screen.getByText('May').getAttribute('disabled')).to.equal(null);
      });
    }

    if (propsToTest.includes('disablePast')) {
      it('should apply disablePast', function test() {
        const { render, clock } = getOptions();

        let now;
        const WithFakeTimer = (props) => {
          now = adapterToUse.date(new Date());
          return <ElementToTest value={now} {...props} />;
        };
        const { setProps } = render(<WithFakeTimer {...defaultProps} disablePast />);

        const nextMonth = adapterToUse.addMonths(now, 1);
        const prevMonth = adapterToUse.addMonths(now, -1);

        expect(screen.getByText(adapterToUse.format(now, 'monthShort'))).not.to.have.attribute(
          'disabled',
        );

        if (!adapterToUse.isSameYear(now, nextMonth)) {
          setProps({ value: nextMonth });
          clock.runToLast();
        }
        expect(
          screen.getByText(adapterToUse.format(nextMonth, 'monthShort')),
        ).not.to.have.attribute('disabled');

        if (!adapterToUse.isSameYear(prevMonth, nextMonth)) {
          setProps({ value: prevMonth });
          clock.runToLast();
        }
        expect(screen.getByText(adapterToUse.format(prevMonth, 'monthShort'))).to.have.attribute(
          'disabled',
        );

        // TODO: define what appends when value is `null`
      });
    }

    if (propsToTest.includes('disableFuture')) {
      it('should apply disableFuture', function test() {
        const { render, clock } = getOptions();

        let now;
        const WithFakeTimer = (props) => {
          now = adapterToUse.date(new Date());
          return <ElementToTest value={now} {...props} />;
        };
        const { setProps } = render(<WithFakeTimer {...defaultProps} disableFuture />);

        const nextMonth = adapterToUse.addMonths(now, 1);
        const prevMonth = adapterToUse.addMonths(now, -1);

        expect(screen.getByText(adapterToUse.format(now, 'monthShort'))).not.to.have.attribute(
          'disabled',
        );

        if (!adapterToUse.isSameYear(now, nextMonth)) {
          setProps({ value: nextMonth });
          clock.runToLast();
        }
        expect(screen.getByText(adapterToUse.format(nextMonth, 'monthShort'))).to.have.attribute(
          'disabled',
        );

        if (!adapterToUse.isSameYear(prevMonth, nextMonth)) {
          setProps({ value: prevMonth });
          clock.runToLast();
        }
        expect(
          screen.getByText(adapterToUse.format(prevMonth, 'monthShort')),
        ).not.to.have.attribute('disabled');

        // TODO: define what appends when value is `null`
      });
    }

    if (propsToTest.includes('minDate')) {
      it('should apply minDate', function test() {
        const { render } = getOptions();

        render(
          <ElementToTest
            {...defaultProps}
            value={adapterToUse.date(new Date(2019, 5, 15))}
            minDate={adapterToUse.date(new Date(2019, 5, 4))}
          />,
        );

        expect(screen.getByText('Jan').getAttribute('disabled')).not.to.equal(null);
        expect(screen.getByText('May').getAttribute('disabled')).not.to.equal(null);
        expect(screen.getByText('Jun').getAttribute('disabled')).to.equal(null);
        expect(screen.getByText('Jul').getAttribute('disabled')).to.equal(null);
        expect(screen.getByText('Dec').getAttribute('disabled')).to.equal(null);

        // TODO: define what appends when value is `null`
      });
    }

    if (propsToTest.includes('maxDate')) {
      it('should apply maxDate', function test() {
        const { render } = getOptions();

        render(
          <ElementToTest
            {...defaultProps}
            value={adapterToUse.date(new Date(2019, 5, 15))}
            maxDate={adapterToUse.date(new Date(2019, 5, 4))}
          />,
        );

        expect(screen.getByText('Jan').getAttribute('disabled')).to.equal(null);
        expect(screen.getByText('Jun').getAttribute('disabled')).to.equal(null);
        expect(screen.getByText('Jul').getAttribute('disabled')).not.to.equal(null);
        expect(screen.getByText('Dec').getAttribute('disabled')).not.to.equal(null);

        // TODO: define what appends when value is `null`
      });
    }
  });
}

export default testMonthViewValidation;
