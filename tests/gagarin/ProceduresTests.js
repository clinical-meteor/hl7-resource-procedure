describe('clinical:hl7-resources-procedure', function () {
  var server = meteor();
  var client = browser(server);

  it('Procedures should exist on the client', function () {
    return client.execute(function () {
      expect(Procedures).to.exist;
    });
  });

  it('Procedures should exist on the server', function () {
    return server.execute(function () {
      expect(Procedures).to.exist;
    });
  });

});
