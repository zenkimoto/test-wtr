import { expect, assert, fixture, html } from '@open-wc/testing';
import '../src/hello_world.js';

describe('hello-world', () => {
  it('works', async () => {
    const el = await fixture(html` <hello-world></hello-world> `);
  });

  it('renders default values', async () => {
    const el = await fixture(html` <hello-world></hello-world> `);

    assert.shadowDom.equal(el, '<span><slot name="text"></slot></span>');
  });
});
