$(function() {

    describe('RSS Feeds', function() {
 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('have a name', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function () {
        var body = $('body'),
            menuIcon = $('.menu-icon-link');

        it('should be hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('toggles when menu icon is clicked', function () {
			menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
			
			menuIcon.click(); 
			expect(body.hasClass('menu-hidden')).toBe(true);

        });
    });

	describe('Initial Entries', function() {

		var entry;

        beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		it('should contain at least a single entry', function() {
			entry = $('.feed .entry');
			expect(entry.length).toBeGreaterThan(0);
		});
	});

	describe('New Feed Selection', function() {

        var oldContent;

        beforeEach(function(done) {
			loadFeed(0, function () {
				oldContent = $('.feed').html();
				loadFeed(1, function () {
					done();
				});
			});
		});

        it('should change the content on load', function() {
            var newContent = $('.feed').html();
            expect(newContent).not.toBe(oldContent);
        });
	});
		
}());
